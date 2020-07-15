import React, { Fragment, FC, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../feactures/nav/NavBar";
import ActivityDashboard from "../../feactures/activities/dashboard/ActivityDashboard";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../feactures/home/HomePage";
import ActivityForm from "../../feactures/activities/form/ActivityForm";
import ActivityDetails from "../../feactures/activities/dashboard/details/ActivityDetails";
import NotFound from "./NotFound";
import LoginForm from "../../feactures/users/LoginForm";
import { RootstoreContext } from "../store/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modales/ModalContainer";

const App: FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootstoreContext);
  const {token, setAppLoaded, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore

useEffect(()=>{
  if(token){
    getUser().finally(()=>setAppLoaded())
  }
  else{
    setAppLoaded();
  }
}, [token, setAppLoaded, getUser])

if(!appLoaded){
  return (<LoadingComponent content='Loading app...'/>)
}

  return (
    <Fragment>
    <ModalContainer/>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
