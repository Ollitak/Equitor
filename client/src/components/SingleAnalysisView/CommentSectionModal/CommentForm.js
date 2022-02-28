import React from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, TextArea, Rating } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../reducers/analysisReducer";
import * as Yup from "yup";

import "./styles/commentForm.css";

/** Component renders a form that enables commenting an an analysis.
 *
 *  Yup is used to validate user input.
 *  Formik is used to control state of the input fields, error handling
 *  and form submission.
 */

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();

  const CommentFormSchema = Yup.object().shape({
    content: Yup.string().required("comment is required!"),
    rating: Yup.number().required("rating is required!")
  });

  const onSubmit = async (values) => {
    dispatch(addComment(id, values));
  };

  return (
    <Formik
      initialValues={{
        content: "",
        rating: ""
      }}
      onSubmit={onSubmit}
      validationSchema={CommentFormSchema}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <div className="cf-container">
          <div className="cf-wrapper">
            <Form>
              <Form.Field>
                <label className="cf-label">Rating</label>
                <Rating
                  maxRating={5}
                  icon="star"
                  name={"rating"}
                  onRate={(e, { rating }) => setFieldValue("rating", rating)}
                />
                <ShowError name={"rating"} />
              </Form.Field>
              <Form.Field>
                <label className="cf-label">Comment</label>
                <TextArea
                  name={"content"}
                  value={values.content}
                  type={"string"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError name={"content"} />
              </Form.Field>
              <Form.Group>
                <button className="cf-button cf-button-create" type="submit" onClick={handleSubmit}>
                  SUBMIT
                </button>
              </Form.Group>
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

export default CommentForm;
