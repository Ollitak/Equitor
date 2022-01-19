import React from "react";
import AnalysesList from "./AnalysesList";
import TopSection from "./TopSection";

const FrontPage = ({ analyses, user, setUser, setAnalyses }) => {

  if(!analyses) return <></>;

  return(
    <div>
      <TopSection user={user} setUser={setUser} />
      <AnalysesList analyses={analyses} setAnalyses={setAnalyses}/>
    </div>

  );

};

export default FrontPage;
