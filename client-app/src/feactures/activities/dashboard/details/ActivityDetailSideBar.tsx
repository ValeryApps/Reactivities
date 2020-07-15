import React, { Fragment, FC } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { IAttendee } from "../../../../app/models/activity";

interface IProp{
  Attendees :IAttendee[]
}
const ActivityDetailSideBar:FC<IProp> = ({Attendees}) => {
 
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {Attendees.length} {Attendees.length === 1 ? 'person': 'people'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
        {Attendees.map((attendee)=>(
          <Item style={{ position: "relative" }}>
          {attendee.isHost && 
          <Label
            style={{ position: "absolute" }}
            color="orange"
            ribbon="right"
          >
            Host
          </Label>}
          <Image size="tiny" src={attendee.image || "/assets/user.png"} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="h3">
              <Link to={`#`}>{attendee.displayName}</Link>
            </Item.Header>
            <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
          </Item.Content>
        </Item>
        ))}

        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailSideBar);
