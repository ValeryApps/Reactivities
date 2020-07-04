import React, { FC } from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IActivity } from "../../../../app/models/activity";
import { format } from "date-fns";

const ActivityDetailInfo: FC<{ activity: IActivity | null }> = ({
  activity,
}) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{"description"}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      {activity && (
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {format(new Date(activity.date), "eeee MMMM d, yyyy ")} at{" "}
                {format(new Date(activity.date), "hh:mm:ss")}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      )}

      {activity && (
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                {activity.venue}, {activity.city}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      )}
    </Segment.Group>
  );
};

export default ActivityDetailInfo;
