import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, Container } from "semantic-ui-react";
import * as Yup from "yup";

const LoginFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Enter username"),
  password: Yup.string()
    .required("Enter password"),
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
      initialValues= {{
        username: "",
        password: ""
      }}
      onSubmit={onSubmit}
      validationSchema={LoginFormSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values
      }) => (
        <Container>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Input
                name={"username"}
                value={values.username}
                type={"string"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"username"} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                name={"password"}
                value={values.password}
                type={"password"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"password"} />
            </Form.Field>
            <Form.Group>
              <Form.Button primary type="submit" onClick={handleSubmit}>Login</Form.Button>
              <Form.Button secondary onClick={() => history.push("/")}>Return</Form.Button>
            </Form.Group>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) =>
  <ErrorMessage name={name}>
    { error => <div style={{ color:"red", fontWeight:"bold" }}>{error}</div>}
  </ErrorMessage>;


export default LoginForm;