import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, FormField, Label, Select } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const SelectInput: FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <FormField name="" error={touched && !!error}>
      <Select
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        options={options}
        placeholder={placeholder}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </FormField>
  );
};

export default SelectInput;
