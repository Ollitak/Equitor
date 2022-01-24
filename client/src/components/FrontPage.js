import React from "react";
import AnalysesList from "./AnalysesList";
import { useSelector } from "react-redux";

/* component selects all analyses from redux state and passes them to
AnalyseList component for rendering*/
const FrontPage = () => {
  const analyses = useSelector(state => state.analyses);

  /* myPage is used to indicate if route is set to myPage, which in this
  case is false as this component renders front page */
  return(
    <div>
      <AnalysesList
        analyses={analyses}
        myPage={false}
      />
    </div>
  );
};

export default FrontPage;
