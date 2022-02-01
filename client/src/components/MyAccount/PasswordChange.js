import React from "react";
import { Form, Input, Container, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../reducers/userReducer";
import * as Yup from "yup";

const PasswordChangeSchema = Yup.object().shape({
  password: Yup.string().required("Enter a new password").min(8),
  passwordConfirmation: Yup.string()
    .required("Confirm your new password")
    .oneOf([Yup.ref("password")], "Passwords must match")
});

const PasswordChange = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  var myAccount = useSelector((state) => state.user);

  if (!myAccount) return null;

  const onSubmit = async (values) => {
    console.log(values);
    //dispatch(updateUser(values));
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

            <Form.Group>
              <Form.Button
                style={{ backgroundColor: "red", color: "white" }}
                type="submit"
                onClick={handleSubmit}>
                Change password
              </Form.Button>
            </Form.Group>
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
