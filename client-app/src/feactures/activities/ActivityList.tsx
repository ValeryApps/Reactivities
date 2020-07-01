import React, { FC, useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/store/activityStore";
import { Link } from "react-router-dom";

const ActivityList: FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, deleteActivity, target } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description} </div>
                <div>
                  {activity.city}, {activity.venue}{" "}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  name={activity.id}
                  loading={target === activity.id}
                  onClick={(e) => deleteActivity(e, activity.id)}
                  color="red"
                  content="delete"
                  floated="right"
                />
                <Button
                  as={Link}
                  to={`activities/${activity.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />

                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
