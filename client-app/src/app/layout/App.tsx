import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../feactures/nav/NavBar";
import ActivityDashboard from "../../feactures/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../feactures/home/HomePage";
import ActivityForm from "../../feactures/activities/form/ActivityForm";
import ActivityDetails from "../../feactures/activities/dashboard/details/ActivityDetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities" />;
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route
          path={["/createActivity", "/manage/:id"]}
          component={ActivityForm}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
