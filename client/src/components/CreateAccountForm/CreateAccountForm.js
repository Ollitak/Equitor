import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, Container } from "semantic-ui-react";
import * as Yup from "yup";
import usersService from "../../services/users";
import { useDispatch } from "react-redux";
import { setSuccess, setError } from "../../reducers/notificationReducer";
import "./styles/createAccountForm.css";

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
        <div className="caf-container">
          <div className="caf-wrapper">
            <Form autoComplete="off">
              <h1 className="caf-header">ENTER USER DETAILS TO CREATE NEW ACCOUNT</h1>
              <div className="caf-input-wrapper">
                <Form.Field>
                  <Input
                    transparent
                    className="caf-input"
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
                    className="caf-input"
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
                    className="caf-input"
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
                    className="caf-input"
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
                    className="caf-input"
                    placeholder="Re-enter your password"
                    name={"passwordConfirmation"}
                    value={values.passwordConfirmation}
                    type={"password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError name={"passwordConfirmation"} />
                </Form.Field>
              </div>

              <div className="caf-button-container">
                <button
                  className="caf-button caf-button-create"
                  type="submit"
                  onClick={handleSubmit}>
                  CREATE
                </button>
                <button
                  className="caf-button caf-button-return"
                  onClick={() => history.push("/feed")}>
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

export default CreateAccountForm;
