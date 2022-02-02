import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, Container, Header } from "semantic-ui-react";
import * as Yup from "yup";

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
        <Container>
          <Form autoComplete="off">
            <Header as="h2" content={"Log in"} style={{ color: "white" }} />
            <Form.Field>
              <Input
                style={{ marginBottom: "1em" }}
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
                style={{ marginBottom: "1em" }}
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
            <Form.Group widths="equal">
              <Form.Button
                style={{ backgroundColor: "rgb(10, 40, 230)", color: "white", width: "100%" }}
                type="submit"
                onClick={handleSubmit}>
                Log in
              </Form.Button>
              <Form.Button style={{ width: "100%" }} secondary onClick={() => history.push("/")}>
                Return
              </Form.Button>
            </Form.Group>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) => (
  <ErrorMessage name={name}>
    {(error) => <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}
  </ErrorMessage>
);

export default LoginForm;
