import React, { FC } from "react";
import { IActivity } from "../../app/models/activity";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ActivityListItem: FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src="/assets/user.png" circular />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>
                {format(new Date(activity.date), "eeee d m")}
              </Item.Meta>
              <Item.Description>Hosted by:</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {format(new Date(activity.date), "hh:mm:ss")}
        <Icon name="marker" />
        {activity.venue} , {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="blue"
          content="View"
          floated="right"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
