import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, FormField, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}
const TextInput: FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <FormField name="" error={touched && !!error} type={type}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </FormField>
  );
};

export default TextInput;
