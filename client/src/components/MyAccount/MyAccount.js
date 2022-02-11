import React from "react";
import { Form, Input, Container, Header } from "semantic-ui-react";
import { Formik, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../reducers/userReducer";
import PasswordChange from "./PasswordChange";
import * as Yup from "yup";

import "./styles/myAccount.css";

const MyAccountSchema = Yup.object().shape({
  firstname: Yup.string().required("Enter username"),
  lastname: Yup.string().required("Enter username")
});

const MyAccount = () => {
  const dispatch = useDispatch();
  var myAccount = useSelector((state) => state.user);

  if (!myAccount) return null;

  const onSubmit = async (values) => {
    if (window.confirm("Are you sure you want to edit account information?")) {
      dispatch(updateUser(values));
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: myAccount.firstname,
        lastname: myAccount.lastname
      }}
      onSubmit={onSubmit}
      validationSchema={MyAccountSchema}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <div className="ma-container">
          <div className="ma-wrapper">
            <h1 className="ma-header">ACCOUNT INFORMATION</h1>
            <Form autoComplete="off">
              <Form.Group widths={"equal"} style={{ marginBottom: "2em" }}>
                <Form.Field>
                  <label className="af-label">Username</label>
                  <Input transparent disabled value={myAccount.username} />
                </Form.Field>
              </Form.Group>

              <Form.Group widths={"equal"} style={{ marginBottom: "2em" }}>
                <Form.Field>
                  <label className="af-label">First name</label>
                  <Input
                    name={"firstname"}
                    value={values.firstname}
                    type={"string"}
                    transparent
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError name={"firstname"} />
                </Form.Field>
                <Form.Field>
                  <label className="af-label">Last name</label>
                  <Input
                    name={"lastname"}
                    value={values.lastname}
                    type={"string"}
                    transparent
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError name={"lastname"} />
                </Form.Field>
              </Form.Group>

              <div className="af-button-container">
                <button className="af-button af-button-submit" type="submit" onClick={handleSubmit}>
                  Edit account information
                </button>
              </div>
            </Form>

            <PasswordChange />
          </div>
        </div>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) => (
  <ErrorMessage name={name}>{(error) => <div style={{ color: "red" }}>{error}</div>}</ErrorMessage>
);

export default MyAccount;
