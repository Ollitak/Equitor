import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Input, TextArea, Checkbox, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { addAnalysis } from "../../reducers/analysisReducer";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { stockSelection, keyWordOptions, recommendationOptions } from "../../utilities/utilityData";
import analysisFormSchema from "./validationSchema";
/* Component to render textBox with label and large textarea as well as the error message. */
const TextBox = ({ name, label, value, handleChange, handleBlur }) => {
  return (
    <Form.Field>
      <label>{label}</label>
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
        <div style={{ margin: 50 }}>
          <Form>
            <Header as="h1" content="Create analysis" />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Stock name (ticker)</label>
                <Select
                  options={stockSelection}
                  onChange={(vals) => setFieldValue("stockName", vals.name)}
                />
                <ShowError name={"stockName"} />
              </Form.Field>

              <Form.Field>
                <label>Target price (€)</label>
                <Input
                  name={"targetPrice"}
                  type={"number"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError name={"targetPrice"} />
              </Form.Field>

              <Form.Field>
                <label>Recommendation</label>
                <Select
                  options={recommendationOptions}
                  onChange={(vals) => setFieldValue("recommendation", vals.value)}
                />
                <ShowError name={"recommendation"} />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <label>Key words</label>
              <Select
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

            <Form.Field>
              <label>Analysis title</label>
              <Input name={"title"} type={"text"} onChange={handleChange} onBlur={handleBlur} />
              <ShowError name={"title"} />
            </Form.Field>

            <TextBox
              name={"content.summary"}
              label={"Summary"}
              value={values.content.summary}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />

            <Header as="h2" content="Choose more text fields" />

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
              label={"investmen summary"}
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

            <Form.Group>
              <Form.Button primary type="submit" onClick={handleSubmit}>
                Submit
              </Form.Button>
              <Form.Button secondary onClick={() => history.push("/")}>
                Return
              </Form.Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AnalysisForm;
