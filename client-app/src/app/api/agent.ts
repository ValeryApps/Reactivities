import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/User";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.request.use(config =>{
  const token = localStorage.getItem('jwt');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error=>{
  return Promise.reject(error);
})

axios.interceptors.response.use(undefined, (error) => {
  const { status, data, config } = error.response;
  if (error.message === "Network Error") {
    console.log(error);
    toast.error("Internet probleme");
  }
  if (status === 404) {
    history.push("/notfound");
    toast.error("Resources not found!");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
    toast.error("Guid invalid");
  }
  if (status === 500) {
    toast.error("Server error");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const request = {
  get: (url: string) => axios.get(url).then(sleep(20)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(20)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(20)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(20)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => request.get("/activities"),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post("/activities", activity),
  edit: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del(`/activities/${id}`),
  attend: (id:string)=>request.post(`activities/${id}/attend`, {}),
  unAttend: (id:string)=>request.del(`activities/${id}/attend`)
};


const User = {
  currentUser: (): Promise<IUser> => request.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/login", user),
  register: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/register", user),
};

export default {
  Activities,
  User
};
