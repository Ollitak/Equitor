import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, Container } from "semantic-ui-react";
import * as Yup from "yup";
import usersService from "../services/users";
import { useDispatch } from "react-redux";
import { setSuccess, setError } from "../reducers/notificationReducer";

const CreateAccountFormSchema = Yup.object().shape({
  firstname: Yup.string().required("Enter first name"),
  lastname: Yup.string().required("Enter last name"),
  username: Yup.string().required("Enter username").min(5),
  password: Yup.string().required("Enter password").min(8),
  passwordConfirmation: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Must match with password")
});

const CreateAccountForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      await usersService.createUser(values);
      dispatch(setSuccess("Account is now created. Please log in."));
      history.push("/feed");
    } catch (e) {
      console.log(e.response.data);
      dispatch(setError("Account is failed."));
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        passwordConfirmation: ""
      }}
      onSubmit={onSubmit}
      validationSchema={CreateAccountFormSchema}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Container>
          <Form autoComplete="off">
            <Form.Field>
              <Input
                transparent
                style={{ marginBottom: "1em" }}
                placeholder="First name"
                name={"firstname"}
                value={values.firstname}
                type={"string"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"firstname"} />
            </Form.Field>

            <Form.Field>
              <Input
                transparent
                style={{ marginBottom: "1em" }}
                placeholder="Last name"
                name={"lastname"}
                value={values.lastname}
                type={"string"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"lastname"} />
            </Form.Field>

            <Form.Field>
              <Input
                transparent
                style={{ marginBottom: "1em" }}
                placeholder="Username"
                name={"username"}
                value={values.username}
                type={"string"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"username"} />
            </Form.Field>

            <Form.Field>
              <Input
                transparent
                style={{ marginBottom: "1em" }}
                placeholder="Password"
                name={"password"}
                value={values.password}
                type={"password"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"password"} />
            </Form.Field>

            <Form.Field>
              <Input
                transparent
                style={{ marginBottom: "1em" }}
                placeholder="Re-enter your password"
                name={"passwordConfirmation"}
                value={values.passwordConfirmation}
                type={"password"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"passwordConfirmation"} />
            </Form.Field>

            <Form.Group widths="equal">
              <Form.Button
                style={{ backgroundColor: "rgb(10, 40, 230)", color: "white", width: "100%" }}
                type="submit"
                onClick={handleSubmit}>
                Create
              </Form.Button>
              <Form.Button
                style={{ width: "100%" }}
                secondary
                onClick={() => history.push("/feed")}>
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

export default CreateAccountForm;
