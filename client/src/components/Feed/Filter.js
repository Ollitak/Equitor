import React, { useState } from "react";
import Select from "react-select";
import { stockSelection, keyWordOptions, orderingOptions } from "../../utilities/utilityData";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyFilter,
  setKeywordFilter,
  setOrderingFilter,
  resetFilters
} from "../../reducers/filterReducer";
import "./styles/filter.css";

/** Custom styles object for react-select. */

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
  input: (provided) => ({
    ...provided,
    color: "white"
  }),
  singleValue: (provided) => {
    const color = "white";
    return { ...provided, color };
  }
};

/** Component to display filter options.
 *  Component currently has options to filter feed results by either company name or keyword.
 *  Additionally, it has buttons for resetting filters and hiding filter bar. Hiding the filter
 *  bar sets showFilterBar to false.
 */

const FilterContent = ({ setShowFilterBar }) => {
  const dispatch = useDispatch();
  const companyFilter = useSelector((state) => state.filter.companyFilter);
  const keywordFilter = useSelector((state) => state.filter.keywordFilter);
  const orderingFilter = useSelector((state) => state.filter.orderingFilter);

  return (
    <div className="filter-content">
      <div>
        <label className="filter-content-label">Filter by company name</label>
        {/* Select's value attribute expects a shape of object */}
        <Select
          styles={selectCustomStyle}
          value={{ label: companyFilter }}
          options={stockSelection}
          onChange={(vals) => dispatch(setCompanyFilter(vals.name))}
        />
      </div>

      <div style={{ marginTop: "0.5em" }}>
        <label className="filter-content-label">Filter by keyword</label>
        <Select
          styles={selectCustomStyle}
          value={{ label: keywordFilter }}
          options={keyWordOptions}
          onChange={(vals) => dispatch(setKeywordFilter(vals.value))}
        />
      </div>

      <div style={{ marginTop: "0.5em" }}>
        <label className="filter-content-label">Order</label>
        <Select
          styles={selectCustomStyle}
          value={{ label: orderingFilter }}
          options={orderingOptions}
          onChange={(vals) => dispatch(setOrderingFilter(vals.value))}
        />
      </div>

      <div className="filter-content-button-wrapper">
        <button className="filter-content-button" onClick={() => dispatch(resetFilters())}>
          RESET
        </button>
        <button className="filter-content-button" onClick={() => setShowFilterBar(false)}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

/** Component to conditionally render filtering. Filter options are set visible
 *  when user clicks the "FILTER RESULTS" button. When the button is clicked,
 *  showFilterBar is set to true and FilterContent component is rendered.
 */

const Filter = () => {
  const [showFilterBar, setShowFilterBar] = useState(false);

  return (
    <div className="filter-wrapper">
      {showFilterBar ? (
        <FilterContent setShowFilterBar={setShowFilterBar} />
      ) : (
        <button onClick={() => setShowFilterBar(true)} className="filter-show-button">
          FILTER RESULTS
        </button>
      )}
    </div>
  );
};

export default Filter;
