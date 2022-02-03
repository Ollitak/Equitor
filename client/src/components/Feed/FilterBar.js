import React from "react";
import { Segment, Button } from "semantic-ui-react";
import Select from "react-select";
import { stockSelection, keyWordOptions, orderingOptions } from "../../utilities/utilityData";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyFilter,
  setKeywordFilter,
  setOrderingFilter,
  resetFilters
} from "../../reducers/filterReducer";

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
  input: (provided) => ({
    ...provided,
    color: "white"
  }),
  singleValue: (provided) => {
    const color = "white";

    return { ...provided, color };
  }
};

/* Filter bar currently has options to filter feed results by either company name or
keyword. Additionally, it has buttons for resetting filters and hiding filter bar. */
const FilterBar = ({ setShowFilterBar }) => {
  const dispatch = useDispatch();
  const companyFilter = useSelector((state) => state.filter.companyFilter);
  const keywordFilter = useSelector((state) => state.filter.keywordFilter);
  const orderingFilter = useSelector((state) => state.filter.orderingFilter);

  return (
    <Segment
      inverted
      style={{ margin: "auto", marginBottom: "1em", border: "2px inset white", maxWidth: 600 }}>
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

      <div style={{ marginTop: "0.5em" }}>
        <label>Select ordering</label>
        <Select
          styles={selectCustomStyle}
          value={{ label: orderingFilter }}
          options={orderingOptions}
          onChange={(vals) => dispatch(setOrderingFilter(vals.value))}
        />
      </div>

      <Button
        compact
        style={{
          marginTop: "1em",
          height: "3em",
          color: "white",
          backgroundColor: "black",
          border: "solid 1px white"
        }}
        content="Reset"
        onClick={() => dispatch(resetFilters())}
      />

      <Button
        compact
        style={{
          marginTop: "1em",
          height: "3em",
          color: "white",
          backgroundColor: "black",
          border: "solid 1px white"
        }}
        onClick={() => setShowFilterBar(false)}
        content="Close filter"
      />
    </Segment>
  );
};

export default FilterBar;
