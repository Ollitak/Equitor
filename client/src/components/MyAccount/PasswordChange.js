import React from "react";
import { Form, Input, Header } from "semantic-ui-react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import usersService from "../../services/users";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../reducers/notificationReducer";

const PasswordChangeSchema = Yup.object().shape({
  password: Yup.string().required("Enter a new password").min(8),
  passwordConfirmation: Yup.string()
    .required("Confirm your new password")
    .oneOf([Yup.ref("password")], "Passwords must match")
});

const PasswordChange = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    if (window.confirm("Are you sure you want to change your password?")) {
      try {
        usersService.updateMyAccount({ password: values.password });
        dispatch(setSuccess("Password changed successfully!"));
      } catch {
        dispatch(setError("Password change failed."));
      }
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirmation: ""
      }}
      onSubmit={onSubmit}
      validationSchema={PasswordChangeSchema}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <div style={{ marginTop: "5em" }}>
          <Header as="h1" content="Change password" />
          <Form>
            <Form.Group widths={"equal"}>
              <Form.Field>
                <label>New password</label>
                <Input
                  name={"password"}
                  type={"password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError name={"password"} />
              </Form.Field>
              <Form.Field>
                <label>Confirm password</label>
                <Input
                  name={"passwordConfirmation"}
                  type={"password"}
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError name={"passwordConfirmation"} />
              </Form.Field>
            </Form.Group>

            <div style={{ marginTop: "2em" }}>
              <Form.Button
                style={{ backgroundColor: "red", color: "white", width: "25%" }}
                type="submit"
                onClick={handleSubmit}>
                Change password
              </Form.Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) => (
  <ErrorMessage name={name}>
    {(error) => <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}
  </ErrorMessage>
);

export default PasswordChange;
