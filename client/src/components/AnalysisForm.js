import React from "react";
import FormikInputField from "./FormikInputField";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import analysesService from "../services/analyses";

const initialValues = {
  title: "",
  stockName: "",
  stockLogoUrl: "",
  analysisDescription: "",
  stockPriceEstimate: 99,
  analysisPrice: 99
};

const AnalysisForm = ({ analyses, setAnalyses }) => {
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      const response = await analysesService.create(values);
      setAnalyses(analyses.concat(response));
      history.push("/");
    } catch(e) {
      console.log(e.response.data);
    }
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
        <FormikInputField
          name={"analysisPrice"}
          type={"number"}
          formik={formik}
          value={formik.values.analysisPrice}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AnalysisForm;