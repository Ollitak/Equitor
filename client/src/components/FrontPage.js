import React from "react";
import AnalysesList from "./AnalysesList";

const FrontPage = ({ analyses }) => {

  console.log(analyses);
  if(!analyses) return <></>;


  return(
    <div>
      <div>
        YLÄPALKKI
      </div>
      <AnalysesList analyses={analyses}/>
    </div>

  );

};

export default FrontPage;
