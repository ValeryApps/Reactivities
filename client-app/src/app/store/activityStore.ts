import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setActivityProp, creatAttendee } from "../layout/util";

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | null = null;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading =  false;

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("load activities", () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          setActivityProp(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
      // console.log(this.groupActivitiesByDate(activities));
    } catch (error) {
      console.log(error);
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity: IActivity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("loading an activity", () => {
          setActivityProp(activity, this.rootStore.userStore.user!);
          this.selectedActivity = activity;
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction("loading an activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  @action clearActivity = () => {
    this.selectedActivity = null;
  };
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      const attendee = creatAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.Attendees = attendees;
      activity.isHost = true;
      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });

      history.push(`/activities/${activity.id}`);
    } catch (e) {
      runInAction("create activity error", () => {
        this.submitting = false;
      });
      // toast.error(e);
      toast.error(e.response.data.title);
    }
  };
  @action editActivity = async (activity: IActivity) => {
    this.editMode = true;
    this.submitting = true;
    try {
      await agent.Activities.edit(activity);
      runInAction("edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("delete activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action AttendActivity = async () => {
    const attendee = creatAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(()=>{
        if (this.selectedActivity) {
          this.selectedActivity.Attendees.push(attendee);
          this.selectedActivity.isGoing = true;
          this.activityRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity

          );
          this.loading = false;
          toast.success("You are now attending")
        }
      })
    } catch (error) {
      this.loading = false;
      runInAction(()=>{
        toast.error(error);
      })
    }
    
    
  };
  @action CancelActivity = async () => {
    this.loading = true;
    try {
      await agent.Activities.unAttend(this.selectedActivity!.id)
      runInAction(()=>{
        if (this.selectedActivity) {
          this.selectedActivity.Attendees = this.selectedActivity.Attendees.filter(
            (x) => x.userName !== this.rootStore.userStore.user!.username
          );
          this.selectedActivity.isGoing = false;
          this.activityRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity
          );
          this.loading = false;
          toast.success("Attendance cancelled")
        }
      })
    } catch (error) {
      
      runInAction(()=>{
        this.loading = false;
        toast.error(error);
      })
    }
   
   
  };
}
