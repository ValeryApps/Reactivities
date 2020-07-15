import { IActivity, IAttendee } from "../models/activity";
import { IUser } from "../models/User";

export const setActivityProp = (activity:IActivity, user:IUser)=>{
  activity.isGoing = activity.Attendees.some(x=>x.userName === user.username);
  console.log(activity.isGoing);
  
   activity.isHost = activity.Attendees.some(x=>x.userName === user.username && x.isHost);
   console.log(activity.isHost);
   return activity;
}

export const creatAttendee = (user:IUser):IAttendee=>{
  return{
    displayName:user.displayName,
    image: user.image!,
    userName : user.username,
    isHost : false
  }
}