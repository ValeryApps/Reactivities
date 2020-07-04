import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, FormField, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextAreaInput: FC<IProps> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <FormField name="" error={touched && !!error}>
      <textarea {...input} placeholder={placeholder} rows={rows} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </FormField>
  );
};

export default TextAreaInput;
