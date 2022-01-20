import React from "react";
import FormikInputField from "./FormikInputField";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/analysisReducer";


const CommentForm = ({ id }) => {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(addComment(id, values));
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      rating: ""
    },
    onSubmit: onSubmit
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormikInputField
          name={"content"}
          type={"text"}
          formik={formik}
          value={formik.values.content}
        />
        <FormikInputField
          name={"rating"}
          type={"number"}
          formik={formik}
          value={formik.values.rating}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;