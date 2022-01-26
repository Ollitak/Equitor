import React from "react";
import { Segment, Button  } from "semantic-ui-react";
import Select from "react-select";
import { stockSelection, keyWordOptions } from "../AnalysisForm/utilities";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyFilter, setKeywordFilter, resetFilters } from "../../reducers/filterReducer";

/* Custom styles object for react-select. */
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
    backgroundColor:"black",
    maxWidth: 600,
  }),
  input: (provided) => ({
    ...provided,
    color:"white",
  }),
  singleValue: (provided) => {
    const color = "white";

    return { ...provided, color };
  },
};

/* Filter bar currently has options to filter feed results by either company name or
keyword. Additionally, it has buttons for resetting filters and hiding filter bar. */
const FilterBar = ({ setShowFilterBar }) => {
  const dispatch = useDispatch();
  const companyFilter = useSelector(state => state.filter.companyFilter);
  const keywordFilter = useSelector(state => state.filter.keywordFilter);

  console.log(keywordFilter);

  return (
    <Segment
      inverted
      style={{ margin: "auto", marginBottom: "1em", border:"0.2em solid white", maxWidth:600 }}
    >
      <div>
        <label>Select company</label>
        {/* Select's value attribute expects a shape of object */}
        <Select
          styles={selectCustomStyle}
          value={{ label: companyFilter }}
          options={stockSelection}
          onChange={(vals) => dispatch(setCompanyFilter(vals.name))}
        />
      </div>

      <div style={{ marginTop: "0.5em" }}>
        <label>Select keyword</label>
        <Select
          styles={selectCustomStyle}
          value={{ label: keywordFilter }}
          options={keyWordOptions}
          onChange={(vals) => dispatch(setKeywordFilter(vals.value))}
        />
      </div>

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

      <Button
        compact
        style={{
          marginTop:"1em",
          height:"3em",
          color:"white",
          backgroundColor:"black",
          border: "solid 1px white"
        }}
        onClick={() => setShowFilterBar(false)}
        content="Close filter"
      />
    </Segment>
  );
};

export default FilterBar;