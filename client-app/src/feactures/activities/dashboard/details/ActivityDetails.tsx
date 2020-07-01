import React, { FC, useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../../app/layout/LoadingComponent";

interface ActivityParams {
  id: string;
}

const ActivityDetails: FC<RouteComponentProps<ActivityParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSelectedActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);
  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity" />;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/activities")}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
