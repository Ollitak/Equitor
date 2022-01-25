import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Input, TextArea, Checkbox } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { addAnalysis } from "../reducers/analysisReducer";
import { useDispatch } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";

const stockSelection = [
  {
    name: "Valmet Oyj",
    ticker: "VALMT",
    logoUrl: "https://www.valmet.com/globalassets/media/media-gallery/logos/valmet_logo_rgb.jpg"
  },
  {
    name: "Wärtsilä Oyj",
    ticker: "WRT",
    logoUrl:"https://www.wartsila.com/images/default-source/brand-portal/logo/w-logo-1.png?sfvrsn=9b828545_6"
  },
  {
    name: "Nokia Oyj",
    ticker: "NOK",
    logoUrl: "https://www.nokia.com/sites/default/files/styles/scale_720_no_crop/public/media/nokia_white_logo.png"
  }
];

const keyWordsSelection = [
  { value: "DCF", label: "DCF" },
  { value: "multiples analysis", label: "multiples analysis" },
  { value: "qualitative analysis", label: "qualitative analysis" },
  { value: "quantitative analysis", label: "quantitative analysis" },
  { value: "numerical analysis", label: "numerical analysis" },
  { value: "competitors analysis", label: "market analysis" },
  { value: "market analysis", label: "analysis" },
  { value: "valuation", label: "valuation" },
  { value: "historical analysis", label: "historical analysis" },
  { value: "forecast", label: "forecast" },
  { value: "Excel", label: "Excel" },
  { value: "PowerPoint", label: "PowerPoint" },
];

const AnalysisFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required!"),
  targetPrice: Yup.number()
    .min(0, "must be positive!"),
  stockSelectionIndex: Yup.number()
    .required("Stock must be selected!")
});

const AnalysisForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  /* Used to control which textboxes are shown. Initially all are hidden,
  but when corresponding checkbox is checked, a textboxShow is set to true
  and textBox appears */
  const [textboxShow, setTextboxShow] = useState({
    summary: false,
    basicCompanyInformation: false,
    businessDescription: false,
    industryOverviewAndCompetitivePositioning: false,
    investmentSummary: false,
    financialAnalysis: false,
    valuation: false,
    investmentRisks: false,
    ESGMatters: false,
  });

  const onSubmit = async (values) => {
    console.log({
      ...values,
      stockInformation: stockSelection[values.stockSelectionIndex]
    });
    dispatch(addAnalysis({
      ...values,
      stockInformation: stockSelection[values.stockSelectionIndex]
    }));
    history.push("/");
  };

  return (
    <Formik
      initialValues={{
        title: "",
        content: {
          basicCompanyInformation: "",
          businessDescription: "",
          industryOverviewAndCompetitivePositioning: "",
          investmentSummary: "",
          financialAnalysis: "",
          valuation: "",
          investmentRisks: "",
          ESGMatters: ""
        },
        stockSelectionIndex: "",
        targetPrice: "",
        keyWords:[],
      }}
      onSubmit={onSubmit}
      validationSchema={AnalysisFormSchema}
    >
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <div style={{ margin: 50 }}>
          <Form>
            <Form.Group  widths='equal'>
              <Form.Field>
                <label>Stock name (ticker)</label>
                <Field
                  as="select"
                  name={"stockSelectionIndex"}
                >
                  {stockSelection.map((stock, index) => (
                    <option key={index} value={index}>
                      {`${stock.name} (${stock.ticker})`}
                    </option>
                  ))}
                </Field>
                <ShowError name={"stockSelectionIndex"} />
              </Form.Field>

              <Form.Field>
                <label>Your price estimate (€)</label>
                <Input
                  name={"targetPrice"}
                  type={"number"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError name={"targetPrice"} />
              </Form.Field>

              <Form.Field>
                <label>Key words</label>
                <Select
                  name={"keyWords"}
                  options={keyWordsSelection}
                  isMulti={true}
                  onChange={(vals) => setFieldValue("keyWords", vals.map(val => val.value))}
                />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <label>Title</label>
              <Input
                name={"title"}
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError name={"title"} />
            </Form.Field>

            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"basic company information"}
              onChange={() => {
                setTextboxShow({ ...textboxShow, basicCompanyInformation: !textboxShow.basicCompanyInformation });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"business description"}
              onChange={() => {
                setTextboxShow({ ...textboxShow, businessDescription: !textboxShow.businessDescription });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"industry overview and competitive positioning"}
              onChange={() => {
                setTextboxShow({ ...textboxShow, industryOverviewAndCompetitivePositioning: !textboxShow.industryOverviewAndCompetitivePositioning });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"investmen summary"}
              onChange={() => {
                setTextboxShow({ ...textboxShow, investmentSummary: !textboxShow.investmentSummary });
              }}
            />
            <Checkbox
              style={{ margin: "2em 1em" }}
              label={"financial analysis"}
              onChange={() => {
                setTextboxShow({ ...textboxShow, financialAnalysis: !textboxShow.financialAnalysis });
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

            <TextBox
              name={"content.summary"}
              textBoxDescription={"Summary"}
              handleChange={handleChange}
              handleBlur={handleBlur} />

            {textboxShow.basicCompanyInformation
              ? <TextBox
                name={"content.basicCompanyInformation"}
                textBoxDescription={"Basic company information"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }
            {textboxShow.businessDescription
              ? <TextBox
                name={"content.businessDescription"}
                textBoxDescription={"Business description"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }
            {textboxShow.industryOverviewAndCompetitivePositioning
              ? <TextBox
                name={"content.industryOverviewAndCompetitivePositioning"}
                textBoxDescription={"Industry overview and competitive positioning"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }
            {textboxShow.investmentSummary
              ? <TextBox
                name={"content.investmentSummary"}
                textBoxDescription={"Investment summary"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }
            {textboxShow.financialAnalysis
              ? <TextBox
                name={"content.financialAnalysis"}
                textBoxDescription={"Financial analysis"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }

            {textboxShow.valuation
              ? <TextBox
                name={"content.valuation"}
                textBoxDescription={"Valuation"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }
            {textboxShow.investmentRisks
              ?<TextBox
                name={"content.investmentRisks"}
                textBoxDescription={"Investment risks"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }
            { textboxShow.ESGMatters
              ? <TextBox
                name={"content.ESGMatters"}
                textBoxDescription={"ESG matters"}
                handleChange={handleChange}
                handleBlur={handleBlur} />
              : null
            }
            <Form.Group>
              <Form.Button primary type="submit" onClick={handleSubmit}>Submit</Form.Button>
              <Form.Button secondary onClick={() => history.push("/")}>Return</Form.Button>
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


const TextBox = ({ name, textBoxDescription, handleChange, handleBlur }) => {
  return (
    <Form.Field>
      <label>{textBoxDescription}</label>
      <TextArea
        name={name}
        type={"text"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ShowError name={name} />
    </Form.Field>
  );
};

export default AnalysisForm;