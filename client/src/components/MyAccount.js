import React from "react";
import { Form, Input, Container, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const history = useHistory();
  var myAccount = useSelector((state) => state.user);

  if (!myAccount) return null;

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: myAccount.firstname,
        lastname: myAccount.lastname
      }}
      onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Container>
          <div style={{ margin: 50 }}>
            <Header as="h1" content="My account information" />
            <Form>
              <Form.Group widths={"equal"}>
                <Form.Field>
                  <label>Username</label>
                  <Input disabled value={myAccount.username} />
                </Form.Field>
                <Form.Field>
                  <label>New password</label>
                  <Input disabled value={"TO BE IMPLEMENTED"} />
                </Form.Field>
              </Form.Group>

              <Form.Group widths={"equal"}>
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
              </Form.Group>

              <Form.Group>
                <Form.Button
                  style={{ backgroundColor: "rgb(10, 40, 230)", color: "white" }}
                  type="submit"
                  onClick={handleSubmit}>
                  Edit
                </Form.Button>
                <Form.Button secondary onClick={() => history.push("/feed")}>
                  Return
                </Form.Button>
              </Form.Group>
            </Form>
          </div>
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

export default MyAccount;
