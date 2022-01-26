import React from "react";
import { Segment, Form, Button  } from "semantic-ui-react";
import Select from "react-select";
import { stockSelection } from "./AnalysisForm/utilities";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyFilter, resetFilters } from "../reducers/filterReducer";


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