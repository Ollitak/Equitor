import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, Container } from "semantic-ui-react";
import * as Yup from "yup";
import usersService from "../services/users";

const CreateAccountFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Enter name"),
  username: Yup.string()
    .required("Enter username")
    .min(5),
  password: Yup.string()
    .required("Enter password")
    .min(8),
  passwordConfirmation: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")],"Must match with password"),
});

const CreateAccountForm = () => {
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      await usersService.createUser(values);
      history.push("/feed");
    } catch(e) {
      console.log(e.response.data);
    }
  };

  return (
    <Formik
      initialValues= {{
        name: "",
        username: "",
        password: "",
        passwordConfirmation: ""
      }}
      onSubmit={onSubmit}
      validationSchema={CreateAccountFormSchema}
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
              <label>Name</label>
              <Input
                name={"name"}
                value={values.name}
                type={"string"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"name"} />
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

            <Form.Group>
              <Form.Button primary type="submit" onClick={handleSubmit}>Create</Form.Button>
              <Form.Button secondary onClick={() => history.push("/feed")}>Return</Form.Button>
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


export default CreateAccountForm;