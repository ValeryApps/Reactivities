import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button,Header } from "semantic-ui-react";
import TextInput from "../../app/common/forms/TextInput";
import { RootstoreContext } from "../../app/store/rootStore";
import { IUserFormValues } from "../../app/models/User";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/forms/ErrorMessage";

const validate = combineValidators({
  email:isRequired('email'),
  password:isRequired('password')
});

const RegisterForm = () => {
  const rootStore = useContext(RootstoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(value: IUserFormValues) => register(value).catch(error=>({
        [FORM_ERROR]:error
      }))}
      validate = {validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
        <Header as = 'h2' content = "Register " color='teal' textAlign = 'center'/>
          <Field name="userName" component={TextInput} placeholder="Username" />
          <Field name="displayName" component={TextInput} placeholder="Display name" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error = {submitError} text = 'Something went wrong. Please try again'/>}<br/>
          <Button fluid
          disabled ={(invalid && !dirtySinceLastSubmit) || pristine  }
           loading={submitting} color='teal' content="Register" />
         
        </Form>
      )}
    />
  );
};

export default RegisterForm;
