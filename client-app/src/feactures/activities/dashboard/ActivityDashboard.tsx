import React, { FC, useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "../ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootstoreContext } from "../../../app/store/rootStore";

const ActivityDashboard: FC = () => {
  const rootStore = useContext(RootstoreContext);
  const { loadActivities, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if (loadingInitial) return <LoadingComponent content="Loading activities" />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
