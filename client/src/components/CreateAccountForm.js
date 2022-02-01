import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, Container } from "semantic-ui-react";
import * as Yup from "yup";
import usersService from "../services/users";

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

  const onSubmit = async (values) => {
    try {
      await usersService.createUser(values);
      history.push("/feed");
    } catch (e) {
      console.log(e.response.data);
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
          <Form>
            <Form.Field>
              <label>First name</label>
              <Input
                name={"firstname"}
                value={values.firstname}
                type={"string"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"firstname"} />
            </Form.Field>

            <Form.Field>
              <label>Last name</label>
              <Input
                name={"lastname"}
                value={values.lastname}
                type={"string"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"lastname"} />
            </Form.Field>

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

            <Form.Field>
              <label>Re-enter your password</label>
              <Input
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
