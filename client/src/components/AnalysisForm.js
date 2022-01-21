import React from "react";
import { Formik, Field, Form } from "formik";
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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label>title</label>
              <Field
                name={"title"}
                type={"text"}
              />
            </div>

            <div>
              <label>stock</label>
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
            </div>

            {/*<div>
              <label>stockLogoUrl</label>
              <Field
                name={"stockLogoUrl"}
                type={"text"}
              />
            </div>*/}

            <div>
              <label>description</label>
              <Field
                name={"description"}
                type={"text"}
              />
            </div>

            <div>
              <label>key words</label>
              <Select
                name={"keyWords"}
                options={keyWordsSelection}
                isMulti={true}
                onChange={(vals) => setFieldValue("keyWords", vals.map(val => val.value))}
              />
            </div>


            <div>
              <label>stockPriceEstimate</label>
              <Field
                name={"stockPriceEstimate"}
                type={"number"}
              />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};



export default AnalysisForm;