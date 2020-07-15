export interface IActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  city: string;
  venue: string;
  isGoing?:boolean;
  isHost?:boolean;
  Attendees: IAttendee[];
}
export class ActivityFormValue implements IActivity {
  id: string = "";
  title: string = "";
  category: string = "";
  description: string = "";
  date: string = "";
  city: string = "";
  venue: string = "";
  // isGoing:boolean =true;
  // isHost:boolean = true;
  Attendees: IAttendee[] = [];
  constructor(init?: IActivity) {
    Object.assign(this, init);
  }
 
  
}
export interface IAttendee{
  userName:string;
  displayName:string;
  image:string;
  isHost:boolean
}