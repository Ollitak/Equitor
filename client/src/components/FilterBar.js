import React from "react";
import { Segment, Form  } from "semantic-ui-react";
import Select from "react-select";
import { stockSelection } from "./AnalysisForm/utilities";
import { useDispatch } from "react-redux";
import { setCompanyFilter } from "../reducers/filterReducer";


const FilterBar = () => {
  const dispatch = useDispatch();

  return (
    <Segment inverted style={{ borderRadius: 0 }}>
      <Segment inverted style={{ margin: "auto", padding:"0em", maxWidth:600 }}>

        <Form.Field>
          <label>Filter by company</label>
          <Select
            styles={{ color:"red" }}
            options={stockSelection}
            onChange={(vals) => dispatch(setCompanyFilter(vals.name))}
          />
        </Form.Field>

      </Segment>
    </Segment>
  );
};


export default FilterBar;