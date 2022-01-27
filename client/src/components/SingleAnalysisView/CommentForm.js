import React from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, TextArea, Rating } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addComment } from "../../reducers/analysisReducer";
import * as Yup from "yup";


const CommentForm = ({ id }) => {
  const dispatch = useDispatch();

  const CommentFormSchema = Yup.object().shape({
    content: Yup.string()
      .required("comment is required!"),
    rating: Yup.number()
      .required("rating is required!")
  });


  const onSubmit = async (values) => {
    dispatch(addComment(id, values));
  };

  return (
    <Formik
      initialValues={{
        content:"",
        rating:""
      }}
      onSubmit={onSubmit}
      validationSchema={CommentFormSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values
      }) => (
        <div style={{ margin: 50 }}>
          <Form>
            <Form.Field>
              <label>Rating</label>
              <Rating
                maxRating={5}
                icon="star"
                name={"rating"}
                onRate={(e, { rating }) => setFieldValue("rating", rating)} />
              <ShowError name={"rating"} />
            </Form.Field>
            <Form.Field>
              <label>Write a comment</label>
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
              <Form.Button
                type="submit"
                content="Submit"
                onClick={handleSubmit}
                style={{ backgroundColor:"green", color:"white" }}
              />
            </Form.Group>
          </Form>
        </div>
      )}
    </Formik>
  );
};

const ShowError = ({ name }) =>
  <ErrorMessage name={name}>
    { error => <div style={{ color:"red", fontWeight:"bold" }}>{error}</div>}
  </ErrorMessage>;

export default CommentForm;


