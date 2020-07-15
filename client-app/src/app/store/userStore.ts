import { observable, computed, action, runInAction, configure } from "mobx";
import { IUser, IUserFormValues } from "../models/User";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

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
      this.rootstore.commonStore.setToken(user.token)
      history.push('/activities')
    } catch (error) {
     throw error;
    }
  };
  @action register = async (values: IUserFormValues) => {
   
    try {
      const user = await agent.User.register(values);
      runInAction(() => {
        this.user = user; 
      });
      this.rootstore.commonStore.setToken(user.token);
      this.rootstore.modalStore.closeModal()
      history.push('/activities')
    } catch (error) {
     throw error;
    }
  };

  @action logOut = ()=>{
    this.rootstore.commonStore.setToken(null);
    this.user = null;
    history.push('/')
  }

  @action getUser = async ()=>{
   try {
   const user = await agent.User.currentUser();
     runInAction(()=>{
       this.user = user;
     })
   } catch (error) {
     console.log(error);
   }
  }
}
