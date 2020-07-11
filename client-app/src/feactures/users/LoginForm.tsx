import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../app/common/forms/TextInput";
import { RootstoreContext } from "../../app/store/rootStore";
import { IUserFormValues } from "../../app/models/User";

const LoginForm = () => {
  const rootStore = useContext(RootstoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(value: IUserFormValues) => login(value)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="emal" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          <Button positive content="Login" />
        </Form>
      )}
    />
  );
};

export default LoginForm;
