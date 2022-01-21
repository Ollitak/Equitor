import React from "react";
import { Input } from "semantic-ui-react";

const FormikInputField = ({ name, type, formik, value }) => {
  return (
    <div>
      <label>{name}</label>
      <Input
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        value={value}
      />
    </div>
  );
};

export default FormikInputField;