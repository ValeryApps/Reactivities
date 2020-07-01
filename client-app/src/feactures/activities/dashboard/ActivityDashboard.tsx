import React, { FC, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "../ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/store/activityStore";

const ActivityDashboard: FC = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, editMode } = activityStore;
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
