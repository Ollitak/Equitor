import React from "react";
import AnalysesList from "./AnalysesList";
import TopSection from "./TopSection";

const FrontPage = ({ analyses, user }) => {

  if(!analyses) return <></>;

  return(
    <div>
      <TopSection user={user} />
      <AnalysesList analyses={analyses} />
    </div>

  );

};

export default FrontPage;
