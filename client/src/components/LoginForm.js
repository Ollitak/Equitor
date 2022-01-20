import React from "react";
import FormikInputField from "./FormikInputField";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import loginService from "../services/login";
import analysesService from "../services/analyses";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";


const initialValues = {
  username: "StockWizard",
  password: "password"
};


const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      const response = await loginService.login(values);
      dispatch(login(response));
      window.localStorage.setItem("loggedUser", JSON.stringify(response));
      analysesService.setToken(response.token);
      history.push("/");
    } catch(e) {
      console.log(e.response.data);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit
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
          name={"password"}
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