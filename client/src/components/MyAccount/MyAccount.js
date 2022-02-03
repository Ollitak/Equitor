import React from "react";
import { Form, Input, Container, Header } from "semantic-ui-react";
import { Formik, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../reducers/userReducer";
import PasswordChange from "./PasswordChange";
import * as Yup from "yup";

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
        <Container>
          <div style={{ margin: 50 }}>
            <Header as="h1" content="Account information" style={{ color: "white" }} />
            <Form autoComplete="off">
              <Form.Group widths={"equal"} style={{ marginBottom: "2em" }}>
                <Form.Field>
                  <label style={{ color: "white" }}>Username</label>
                  <Input transparent disabled value={myAccount.username} />
                </Form.Field>
              </Form.Group>

              <Form.Group widths={"equal"} style={{ marginBottom: "2em" }}>
                <Form.Field>
                  <label style={{ color: "white" }}>First name</label>
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
                  <label style={{ color: "white" }}>Last name</label>
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

              <div style={{ marginTop: "2em" }}>
                <Form.Button
                  style={{ backgroundColor: "rgb(10, 40, 230)", color: "white" }}
                  type="submit"
                  onClick={handleSubmit}>
                  Edit account information
                </Form.Button>
              </div>
            </Form>

            <PasswordChange />
          </div>
        </Container>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) => (
  <ErrorMessage name={name}>{(error) => <div style={{ color: "red" }}>{error}</div>}</ErrorMessage>
);

export default MyAccount;
