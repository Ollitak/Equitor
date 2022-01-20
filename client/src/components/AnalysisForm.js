import React from "react";
import FormikInputField from "./FormikInputField";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { addAnalysis } from "../reducers/analysisReducer";
import { useDispatch } from "react-redux";

const initialValues = {
  title: "",
  stockName: "",
  stockLogoUrl: "",
  analysisDescription: "",
  stockPriceEstimate: 99,
};

const AnalysisForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(addAnalysis(values));
    history.push("/");
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit
  });


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormikInputField
          name={"title"}
          type={"text"}
          formik={formik}
          value={formik.values.title}
        />
        <FormikInputField
          name={"stockName"}
          type={"text"}
          formik={formik}
          value={formik.values.stockName}
        />
        <FormikInputField
          name={"stockLogoUrl"}
          type={"text"}
          formik={formik}
          value={formik.values.stockLogoUrl}
        />
        <FormikInputField
          name={"analysisDescription"}
          type={"text"}
          formik={formik}
          value={formik.values.analysisDescription}
        />
        <FormikInputField
          name={"stockPriceEstimate"}
          type={"number"}
          formik={formik}
          value={formik.values.stockPriceEstimate}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AnalysisForm;