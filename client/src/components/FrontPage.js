import React from "react";
import AnalysesList from "./AnalysesList";
import TopSection from "./TopSection";
import { useSelector } from "react-redux";

const FrontPage = () => {
  const analyses = useSelector(state => state.analyses);

  return(
    <div>
      <TopSection />
      <AnalysesList
        analyses={analyses}
      />
    </div>
  );
};

export default FrontPage;
