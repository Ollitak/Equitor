import React from "react";
import { Segment, Form, Button  } from "semantic-ui-react";
import Select from "react-select";
import { stockSelection } from "./AnalysisForm/utilities";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyFilter, resetFilters } from "../reducers/filterReducer";

/* Custom styles object for react-select */
const selectCustomStyle = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "black",
    padding: 20,
    border: "0.5px solid white",
  }),
  option: (provided) => ({
    ...provided,
    borderBottom: "0.5px solid white",
    color: "white",
    padding: 10,
    backgroundColor: "black"
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor:"black"
  }),
  container: (provided) => ({
    ...provided,
    color:"white",
  }),
  input: (provided) => ({
    ...provided,
    color:"white",
  }),
  singleValue: (provided) => {
    const color = "white";

    return { ...provided, color };
  }
};

const FilterBar = () => {
  const dispatch = useDispatch();
  const companyFilter = useSelector(state => state.filter.companyFilter);
  console.log(companyFilter);
  return (
    <Segment inverted style={{ borderRadius: 0 }}>
      <Segment inverted style={{ margin: "auto", padding:"0em", maxWidth:600 }}>

        <Form.Field>
          <label>Filter by company</label>
          {/* Select's value attribute expects a shape of object */}
          <Select
            styles={selectCustomStyle}
            value={{ label: companyFilter }}
            options={stockSelection}
            onChange={(vals) => dispatch(setCompanyFilter(vals.name))}
          />
          <Button
            compact
            style={{
              marginTop:"1em",
              height:"3em",
              color:"white",
              backgroundColor:"black",
              border: "solid 1px white"
            }}
            content="Reset"
            onClick={() => dispatch(resetFilters())}
          />
        </Form.Field>

      </Segment>
    </Segment>
  );
};

export default FilterBar;