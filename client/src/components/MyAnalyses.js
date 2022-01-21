import React from "react";
import AnalysesList from "./AnalysesList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const MyAnalyses = () => {
  const myAnalyses = useSelector(state => state.analyses.filter(analysis => analysis.user === state.user.id));

  if(!myAnalyses) return <></>;

  return (
    <div>
      <Link to={"/"}>
        <button> home page </button>
      </Link>
      <AnalysesList
        myPage={true}
        analyses={myAnalyses}
      />
    </div>
  );

};

export default MyAnalyses;