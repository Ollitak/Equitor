import React from "react";

const FormikInputField = ({ name, type, formik, value }) => {
  return (
    <div>
      <label>{name}</label>
      <input
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