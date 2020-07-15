import React, { FC } from "react";
import { IActivity } from "../../app/models/activity";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ActivityListItemAttendees from "./dashboard/ActivityListItemAttendees";


const ActivityListItem: FC<{ activity: IActivity }> = ({ activity }) => {

  const attendee = activity.Attendees.find((x) => x.isHost);

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src={attendee!.image || "/assets/user.png"} circular />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
              <Item.Meta>
                {format(new Date(activity.date), "eeee d m")}
              </Item.Meta>
              <Item.Description>Hosted by: {attendee!.userName}</Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="Your are host of this event"
                  />
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="Your are going to this event"
                  />
                </Item.Description>
              )}
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
      <Segment secondary>
        <ActivityListItemAttendees Attendees={activity.Attendees!} />
      </Segment>
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
