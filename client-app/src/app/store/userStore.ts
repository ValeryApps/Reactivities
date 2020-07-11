import { observable, computed, action, runInAction, configure } from "mobx";
import { IUser, IUserFormValues } from "../models/User";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
configure({ enforceActions: "always" });

export default class UserStore {
  rootstore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootstore = rootStore;
  }
  @observable user: IUser | null = null;
  @computed get isLoggedin() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      console.log(this.user);
    } catch (error) {
      console.log(error);
    }
  };
}
