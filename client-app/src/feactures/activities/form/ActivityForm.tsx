import React, { FC, useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as guid } from "uuid";
import ActivityStore from "../../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailsParams {
  id: string;
}

const ActivityForm: FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: guid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/reactivities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    selectedActivity,
    clearActivity,
  } = activityStore;

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        selectedActivity && setActivity(selectedActivity);
      });
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    selectedActivity,
    activity.id.length,
  ]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              placeholder="Title"
              value={activity.title}
              onChange={handleInputChange}
              name="title"
            />
            <Form.TextArea
              rows={5}
              placeholder="Description"
              value={activity.description}
              onChange={handleInputChange}
              name="description"
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
              onChange={handleInputChange}
              name="date"
            />
            <Form.Input
              placeholder="Category"
              value={activity.category}
              onChange={handleInputChange}
              name="category"
            />
            <Form.Input
              placeholder="Venue"
              value={activity.venue}
              onChange={handleInputChange}
              name="venue"
            />
            <Form.Input
              placeholder="City"
              value={activity.city}
              onChange={handleInputChange}
              name="city"
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              content="Submit"
              type="submit"
            />
            <Button
              onClick={() => history.push("/activities")}
              floated="right"
              content="Cancel"
              type="button"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
