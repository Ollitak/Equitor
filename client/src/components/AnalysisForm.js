import React from "react";
import { Formik, Field } from "formik";
import { Form, Input, TextArea } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { addAnalysis } from "../reducers/analysisReducer";
import { useDispatch } from "react-redux";
import Select from "react-select";

const initialValues = {
  title: "",
  stockSelectionIndex: "",
  description: "",
  stockPriceEstimate: "",
  keyWords:[],
};

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

const AnalysisForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(addAnalysis({
      ...values,
      stockInformation: stockSelection[values.stockSelectionIndex]
    }));
    history.push("/");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <div style={{ margin: 20 }}>
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
              </Form.Field>

              <Form.Field>
                <label>Your price estimate (€)</label>
                <Input
                  name={"stockPriceEstimate"}
                  type={"number"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <TextArea
                name={"description"}
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
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

export default AnalysisForm;