import React from "react";
import AnalysesList from "./AnalysesList";
import TopSection from "./TopSection";

const FrontPage = ({ analyses, user, setUser }) => {

  if(!analyses) return <></>;

  return(
    <div>
      <TopSection user={user} setUser={setUser} />
      <AnalysesList analyses={analyses} />
    </div>

  );

};

export default FrontPage;
