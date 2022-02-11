import React from "react";
import { Form, Input, Header } from "semantic-ui-react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import usersService from "../../services/users";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../reducers/notificationReducer";
import "./styles/passwordChange.css";

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
        <div className="pc-wrapper">
          <h1 className="ma-header">Change password</h1>
          <Form>
            <Form.Group widths={"equal"} style={{ marginBottom: "2em" }}>
              <Form.Field>
                <label className="af-label">New password</label>
                <Input
                  name={"password"}
                  type={"password"}
                  transparent
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError name={"password"} />
              </Form.Field>
              <Form.Field>
                <label className="af-label">Confirm password</label>
                <Input
                  name={"passwordConfirmation"}
                  type={"password"}
                  transparent
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError name={"passwordConfirmation"} />
              </Form.Field>
            </Form.Group>

            <div className="af-button-container">
              <button className="af-button af-button-submit" type="submit" onClick={handleSubmit}>
                {" "}
                Change password
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) => (
  <ErrorMessage name={name}>{(error) => <div style={{ color: "red" }}>{error}</div>}</ErrorMessage>
);

export default PasswordChange;
