import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/userReducer";
import { Formik, ErrorMessage } from "formik";
import { Form, Input } from "semantic-ui-react";
import * as Yup from "yup";
import "./styles/loginForm.css";

const LoginFormSchema = Yup.object().shape({
  username: Yup.string().required("Enter username"),
  password: Yup.string().required("Enter password")
});

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(login(values));
    history.push("/feed");
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={onSubmit}
      validationSchema={LoginFormSchema}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <div className="login-container">
          <div className="login-wrapper">
            <Form autoComplete="off">
              <h1 className="login-header">ENTER YOUR USER DETAILS TO LOG IN</h1>
              <div className="login-input-wrapper">
                <Form.Field>
                  <Input
                    className="login-input"
                    transparent
                    placeholder="Enter username"
                    name={"username"}
                    value={values.username}
                    type={"text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError name={"username"} />
                </Form.Field>
                <Form.Field>
                  <Input
                    className="login-input"
                    transparent
                    placeholder="Enter password"
                    name={"password"}
                    value={values.password}
                    type={"password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError name={"password"} />
                </Form.Field>
              </div>
              <div className="login-button-container">
                <button
                  className="login-button login-button-login"
                  type="submit"
                  onClick={handleSubmit}>
                  LOG IN
                </button>
                <button
                  className="login-button login-button-return"
                  onClick={() => history.push("/")}>
                  RETURN
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) => (
  <ErrorMessage name={name}>{(error) => <div style={{ color: "red" }}>{error}</div>}</ErrorMessage>
);

export default LoginForm;
