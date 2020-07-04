export interface IActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  city: string;
  venue: string;
}
export class ActivityFormValue implements IActivity {
  id: string = "";
  title: string = "";
  category: string = "";
  description: string = "";
  date: string = "";
  city: string = "";
  venue: string = "";

  constructor(init?: IActivity) {
    Object.assign(this, init);
  }
}
