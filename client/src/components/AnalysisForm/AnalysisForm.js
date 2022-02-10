import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, TextArea, Checkbox, Header, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { addAnalysis } from "../../reducers/analysisReducer";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { stockSelection, keyWordOptions, recommendationOptions } from "../../utilities/utilityData";
import analysisFormSchema from "./validationSchema";

import "./styles/analysisForm.css";

/* Custom styles object for react-select. */
const selectCustomStyle = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgb(48, 48, 48)",
    border: "0.5px solid white"
  }),
  option: (provided) => ({
    ...provided,
    borderBottom: "0.5px solid white",
    color: "white",
    padding: 10,
    backgroundColor: "rgb(48, 48, 48)"
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    borderRadius: 0
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "transparent"
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white"
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    color: "red"
  }),
  input: (provided) => ({
    ...provided,
    color: "white"
  }),
  singleValue: (provided) => {
    const color = "white";

    return { ...provided, color };
  }
};

/* Component to render textBox with label and large textarea as well as the error message. */
const TextBox = ({ name, label, value, handleChange, handleBlur }) => {
  return (
    <Form.Field>
      <label className="af-label">{label}</label>
      <TextArea
        value={value}
        name={name}
        type={"text"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ShowError name={name} />
    </Form.Field>
  );
};

/* Component for rendering error message. */
const ShowError = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(error) => <div style={{ color: "red" }}>{error}</div>}
    </ErrorMessage>
  );
};

const AnalysisForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  /* Used to control which textboxes are shown. Initially all hidden,
  but when corresponding checkbox is checked, a textboxShow is set to true
  and textBox appears. */
  const [textboxShow, setTextboxShow] = useState({
    summary: false,
    basicCompanyInformation: false,
    businessDescription: false,
    industryOverviewAndCompetitivePositioning: false,
    investmentSummary: false,
    financialAnalysis: false,
    valuation: false,
    investmentRisks: false,
    ESGMatters: false
  });

  const onSubmit = async (values) => {
    const analysis = {
      ...values,
      stockInformation: stockSelection.find((s) => s.name === values.stockName)
    };
    dispatch(addAnalysis(analysis));
    history.push("/my-analyses");
  };

  return (
    <Formik
      initialValues={{
        stockName: "",
        targetPrice: "",
        recommendation: "",
        keyWords: [],
        title: "",
        content: {
          summary: "",
          basicCompanyInformation: "",
          businessDescription: "",
          industryOverviewAndCompetitivePositioning: "",
          investmentSummary: "",
          financialAnalysis: "",
          valuation: "",
          investmentRisks: "",
          ESGMatters: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={analysisFormSchema}>
      {({ setFieldValue, handleChange, handleBlur, handleSubmit, values }) => (
        <div className="af-container">
          <div className="af-wrapper">
            <Form>
              <h1 className="af-header">CREATE NEW ANALYSIS</h1>
              <Form.Group widths="equal" style={{ marginBottom: "2em" }}>
                <Form.Field>
                  <label className="af-label">Company name</label>
                  <Select
                    styles={selectCustomStyle}
                    options={stockSelection}
                    onChange={(vals) => setFieldValue("stockName", vals.name)}
                  />
                  <ShowError name={"stockName"} />
                </Form.Field>

                <Form.Field>
                  <label className="af-label">Recommendation</label>
                  <Select
                    styles={selectCustomStyle}
                    options={recommendationOptions}
                    onChange={(vals) => setFieldValue("recommendation", vals.value)}
                  />
                  <ShowError name={"recommendation"} />
                </Form.Field>
              </Form.Group>

              <Form.Field style={{ marginBottom: "2em" }}>
                <label className="af-label">Key words</label>
                <Select
                  styles={selectCustomStyle}
                  name={"keyWords"}
                  options={keyWordOptions}
                  isMulti={true}
                  onChange={(vals) =>
                    setFieldValue(
                      "keyWords",
                      vals.map((val) => val.value)
                    )
                  }
                />
              </Form.Field>
              <Form.Group widths="equal" style={{ marginBottom: "2em" }}>
                <Form.Field>
                  <label className="af-label">Analysis title</label>
                  <Input
                    name={"title"}
                    type={"text"}
                    transparent
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError name={"title"} />
                </Form.Field>

                <Form.Field>
                  <label className="af-label">Target price (€)</label>
                  <Input
                    transparent
                    name={"targetPrice"}
                    type={"number"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError name={"targetPrice"} />
                </Form.Field>
              </Form.Group>

              <TextBox
                name={"content.summary"}
                label={"Summary"}
                value={values.content.summary}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <h1 className="af-subheader">CHOOSE MORE TOPICS TO BEST DESCRIPE YOUR ANALYSIS</h1>

              <Checkbox
                className="af-checkbox"
                label={"basic company information"}
                onChange={() => {
                  setTextboxShow({
                    ...textboxShow,
                    basicCompanyInformation: !textboxShow.basicCompanyInformation
                  });
                }}
              />
              <Checkbox
                className="af-checkbox"
                label={"business description"}
                onChange={() => {
                  setTextboxShow({
                    ...textboxShow,
                    businessDescription: !textboxShow.businessDescription
                  });
                }}
              />
              <Checkbox
                className="af-checkbox"
                label={"industry overview and competitive positioning"}
                onChange={() => {
                  setTextboxShow({
                    ...textboxShow,
                    industryOverviewAndCompetitivePositioning:
                      !textboxShow.industryOverviewAndCompetitivePositioning
                  });
                }}
              />
              <Checkbox
                className="af-checkbox"
                label={"investment summary"}
                onChange={() => {
                  setTextboxShow({
                    ...textboxShow,
                    investmentSummary: !textboxShow.investmentSummary
                  });
                }}
              />
              <Checkbox
                className="af-checkbox"
                label={"financial analysis"}
                onChange={() => {
                  setTextboxShow({
                    ...textboxShow,
                    financialAnalysis: !textboxShow.financialAnalysis
                  });
                }}
              />
              <Checkbox
                className="af-checkbox"
                label={"valuation"}
                onChange={() => {
                  setTextboxShow({ ...textboxShow, valuation: !textboxShow.valuation });
                }}
              />
              <Checkbox
                className="af-checkbox"
                label={"investment risks"}
                onChange={() => {
                  setTextboxShow({ ...textboxShow, investmentRisks: !textboxShow.investmentRisks });
                }}
              />
              <Checkbox
                className="af-checkbox"
                label={"ESG matters"}
                onChange={() => {
                  setTextboxShow({ ...textboxShow, ESGMatters: !textboxShow.ESGMatters });
                }}
              />

              {textboxShow.basicCompanyInformation ? (
                <TextBox
                  name={"content.basicCompanyInformation"}
                  label={"Basic company information"}
                  value={values.content.basicCompanyInformation}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}
              {textboxShow.businessDescription ? (
                <TextBox
                  name={"content.businessDescription"}
                  label={"Business description"}
                  value={values.content.businessDescription}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}
              {textboxShow.industryOverviewAndCompetitivePositioning ? (
                <TextBox
                  name={"content.industryOverviewAndCompetitivePositioning"}
                  label={"Industry overview and competitive positioning"}
                  value={values.content.industryOverviewAndCompetitivePositioning}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}
              {textboxShow.investmentSummary ? (
                <TextBox
                  name={"content.investmentSummary"}
                  label={"Investment summary"}
                  value={values.content.investmentSummary}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}
              {textboxShow.financialAnalysis ? (
                <TextBox
                  name={"content.financialAnalysis"}
                  label={"Financial analysis"}
                  value={values.content.financialAnalysis}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}

              {textboxShow.valuation ? (
                <TextBox
                  name={"content.valuation"}
                  label={"Valuation"}
                  value={values.content.valuation}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}
              {textboxShow.investmentRisks ? (
                <TextBox
                  name={"content.investmentRisks"}
                  label={"Investment risks"}
                  value={values.content.investmentRisks}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}
              {textboxShow.ESGMatters ? (
                <TextBox
                  name={"content.ESGMatters"}
                  label={"ESG matters"}
                  value={values.content.ESGMatters}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              ) : null}

              <div className="af-button-container">
                <button className="af-button af-button-submit" type="submit" onClick={handleSubmit}>
                  SUBMIT
                </button>
                <button onClick={() => history.push("/")} className="caf-button caf-button-return">
                  RETURN
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AnalysisForm;
