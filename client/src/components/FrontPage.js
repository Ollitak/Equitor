import React from "react";
import AnalysesList from "./AnalysesList";
import TopSection from "./TopSection";

const FrontPage = ({ analyses }) => {

  console.log(analyses);
  if(!analyses) return <></>;


  return(
    <div>
      <TopSection />
      <AnalysesList analyses={analyses} />
    </div>

  );

};

export default FrontPage;
