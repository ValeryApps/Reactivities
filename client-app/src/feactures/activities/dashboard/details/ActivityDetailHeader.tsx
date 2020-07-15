import React, { FC, useContext } from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IActivity } from "../../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootstoreContext } from "../../../../app/store/rootStore";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const ActivityDetailHeader: FC<{ activity: IActivity | null }> = ({
  activity,
}) => {
  const rootStore = useContext(RootstoreContext);
  const {AttendActivity, CancelActivity, loading} = rootStore.activityStore
  return (
    <Segment.Group>
      {activity && (
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={`/assets/categoryImages/${activity.category}.jpg`}
            fluid
            style={activityImageStyle}
          />
          <Segment basic style={activityImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={activity.title}
                    style={{ color: "white" }}
                  />
                  <p>{format(new Date(activity.date), "eeee do MMMM")}</p>
                  <p>
                    Hosted by <strong>Bob</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
      )}
     
        <Segment clearing attached="bottom">
          {activity!.isHost ? (
            <Button
              as={Link}
              to={`/manage/${activity!.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          ) : activity!.isGoing ? (
            <Button loading = {loading} onClick = {CancelActivity}>Cancel attendance</Button>
          ) : (
            <Button loading = {loading} onClick ={AttendActivity} color="teal">Join Activity</Button>
          )}
        </Segment>
    
    </Segment.Group>
  );
};

export default observer(ActivityDetailHeader);
