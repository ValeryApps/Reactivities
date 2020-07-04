import React, { FC, useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid, FormGroup } from "semantic-ui-react";
import { ActivityFormValue } from "../../../app/models/activity";
import { v4 as guid } from "uuid";
import ActivityStore from "../../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/forms/TextInput";
import TextAreaInput from "../../../app/common/forms/TextAreaInput";
import SelectInput from "../../../app/common/forms/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  title: isRequired("title"),
  category: isRequired("category"),
  description: isRequired("descript"),
  date: isRequired("date"),
  city: isRequired("city"),
  venue: isRequired("venue"),
});

interface DetailsParams {
  id: string;
}

const ActivityForm: FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const [activity, setActivity] = useState(new ActivityFormValue());
  const [loading, setLoading] = useState(false);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const activityStore = useContext(ActivityStore);
  const {
    submitting,
    loadActivity,
    editActivity,
    createActivity,
  } = activityStore;

  const handleFinalFormSubmit = (value: any) => {
    if (!value.id) {
      let newActivity = {
        ...value,
        id: guid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(value).then(() => history.push(`/activities/${value.id}`));
    }
  };

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => {
          setActivity(new ActivityFormValue(activity));
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder="Title"
                  value={activity.title}
                  name="title"
                  component={TextInput}
                />
                <Field
                  placeholder="Description"
                  value={activity.description}
                  name="description"
                  component={TextAreaInput}
                />
                <Form.Group widths="equal">
                  <Field
                    type="datetime-local"
                    placeholder="Date"
                    value={activity.date}
                    onChange={handleInputChange}
                    name="date"
                    component={TextInput}
                  />
                  <Field
                    placeholder="Category"
                    value={activity.category}
                    component={SelectInput}
                    options={category}
                    name="category"
                  />
                </Form.Group>
                <FormGroup widths="equal">
                  <Field
                    placeholder="Venue"
                    value={activity.venue}
                    onChange={handleInputChange}
                    name="venue"
                    component={TextInput}
                  />
                  <Field
                    placeholder="City"
                    value={activity.city}
                    onChange={handleInputChange}
                    name="city"
                    component={TextInput}
                  />
                </FormGroup>

                {!invalid && (
                  <Button
                    disabled={pristine}
                    loading={submitting}
                    floated="right"
                    positive
                    content="Submit"
                    type="submit"
                  />
                )}
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  floated="right"
                  content="Cancel"
                  type="button"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
