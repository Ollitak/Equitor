import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, TextArea, Checkbox, Header, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { addAnalysis } from "../../reducers/analysisReducer";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { stockSelection, keyWordOptions, recommendationOptions } from "../../utilities/utilityData";
import analysisFormSchema from "./validationSchema";

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
      <label style={{ color: "white" }}>{label}</label>
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
      {(error) => <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}
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
        <Container>
          <Form>
            <Header
              as="h1"
              content="Create analysis"
              style={{ color: "white", marginBottom: "1em" }}
            />
            <Form.Group widths="equal" style={{ marginBottom: "2em" }}>
              <Form.Field>
                <label style={{ color: "white" }}>Stock name (ticker)</label>
                <Select
                  styles={selectCustomStyle}
                  options={stockSelection}
                  onChange={(vals) => setFieldValue("stockName", vals.name)}
                />
                <ShowError name={"stockName"} />
              </Form.Field>

              <Form.Field>
                <label style={{ color: "white" }}>Recommendation</label>
                <Select
                  styles={selectCustomStyle}
                  options={recommendationOptions}
                  onChange={(vals) => setFieldValue("recommendation", vals.value)}
                />
                <ShowError name={"recommendation"} />
              </Form.Field>
            </Form.Group>

            <Form.Field style={{ marginBottom: "2em" }}>
              <label style={{ color: "white" }}>Key words</label>
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
                <label style={{ color: "white" }}>Analysis title</label>
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
                <label style={{ color: "white" }}>Target price (€)</label>
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

            <Header
              as="h2"
              content="Choose more topics to write about"
              style={{ color: "white", marginTop: "2em" }}
            />

            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"basic company information"}
              onChange={() => {
                setTextboxShow({
                  ...textboxShow,
                  basicCompanyInformation: !textboxShow.basicCompanyInformation
                });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"business description"}
              onChange={() => {
                setTextboxShow({
                  ...textboxShow,
                  businessDescription: !textboxShow.businessDescription
                });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
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
              style={{ margin: "2em 1em" }}
              label={"investment summary"}
              onChange={() => {
                setTextboxShow({
                  ...textboxShow,
                  investmentSummary: !textboxShow.investmentSummary
                });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"financial analysis"}
              onChange={() => {
                setTextboxShow({
                  ...textboxShow,
                  financialAnalysis: !textboxShow.financialAnalysis
                });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"valuation"}
              onChange={() => {
                setTextboxShow({ ...textboxShow, valuation: !textboxShow.valuation });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"investment risks"}
              onChange={() => {
                setTextboxShow({ ...textboxShow, investmentRisks: !textboxShow.investmentRisks });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
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

            <Form.Group widths="equal">
              <Form.Button
                style={{ backgroundColor: "rgb(10, 40, 230)", color: "white", width: "100%" }}
                type="submit"
                onClick={handleSubmit}>
                Submit
              </Form.Button>
              <Form.Button style={{ width: "100%" }} secondary onClick={() => history.push("/")}>
                Return
              </Form.Button>
            </Form.Group>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default AnalysisForm;
