import React from "react";
import FormikInputField from "./FormikInputField";
import { useFormik } from "formik";


const submit = values => {
  console.log(values);
};


const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username:"",
      password:""
    },
    onSubmit: submit
  });


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormikInputField
          name={"username"}
          type={"text"}
          formik={formik}
          value={formik.values.username}
        />
        <FormikInputField
          name={"passsword"}
          type={"text"}
          formik={formik}
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default LoginForm;