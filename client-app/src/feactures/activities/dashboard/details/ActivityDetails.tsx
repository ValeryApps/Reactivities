import React, { FC, useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSideBar from "./ActivityDetailSideBar";
import { RootstoreContext } from "../../../../app/store/rootStore";

interface ActivityParams {
  id: string;
}

const ActivityDetails: FC<RouteComponentProps<ActivityParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootstoreContext);
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading activity" />;
  if (!activity) return <h1>Not found</h1>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSideBar Attendees = {activity.Attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
