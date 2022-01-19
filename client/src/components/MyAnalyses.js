import React from "react";
import AnalysesList from "./AnalysesList";
import { Link } from "react-router-dom";

const MyAnalyses = ({ analyses, setAnalyses, user }) => {
  if(!analyses) return <></>;

  /* filter analyses that corresponds to the current user */
  const myAnalyses = analyses.filter(analysis => analysis.user === user.id);

  console.log(myAnalyses);
  return (
    <div>
      <Link to={"/"}>
        <button> home page </button>
      </Link>
      <AnalysesList
        analyses={myAnalyses}
        setAnalyses={setAnalyses}
        myPage={true}
      />
    </div>
  );

};

export default MyAnalyses;