import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import FeedItem from "../FeedItem";
import FilterBar from "./FilterBar";
import { useSelector } from "react-redux";
import prepareAnalyses from "../../utilities/prepareAnalyses";

/* If showFilterBar is set to true, renders FilterBar. Else, renders
button used to set showFilterBar true. */
const Filter = () => {
  const [showFilterBar, setShowFilterBar] = useState(false);

  if(showFilterBar) return <FilterBar setShowFilterBar={setShowFilterBar} />;

  return (
    <div style={{ maxWidth:600, margin:"auto", marginBottom:"1em" }}>
      <Button
        onClick={() => setShowFilterBar(true)}
        content = {"Apply filters"}
        style={{
          backgroundColor:"white",
          color: "black",
          border: "1px solid black",
          height: "3em",
          width:"100%",
        }}
      />
    </div>
  );
};

/* Component to render analysis feed. It retreives analyses and filters from the
redux store and applies the filters to the analyses. Then, it renders filter component
and analysis feed. */
const Feed = () => {
  var analyses = useSelector(state => state.analyses);

  /* Extend analysis objects' fields and apply filtering. */
  analyses = prepareAnalyses(analyses);

  return(
    <div>
      <Filter />

      {analyses.map(analysis =>
        <FeedItem
          key={analysis.id}
          analysis={analysis}
        />
      )}
    </div>
  );
};

export default Feed;