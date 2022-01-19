import React from "react";
import "./AnalyseItem.css";
import analysesService from "../services/analyses";

const AnalyseItem = ({ analysis }) => {

  const onClick = async (id) => {
    try {
      const response = await analysesService.deleteAnalyse(id);
      console.log(response);
    } catch(e) {
      console.log(e.response.data);
    }
  };

  return(
    <div className={"container"}>
      <img src={analysis.stockLogoUrl} className={"image"}></img>
      <div className={"text-container"}>
        <p className={"title"}>{analysis.title}</p>
        <div className={"tools-container"}>
          {analysis.toolsUsed.map((tool,id) =>
            <p className={"tools"} key={id}>{tool}</p>
          )}
        </div>
        <div className={"info-container"}>
          <div className={"info-text"}>
            <p className={"info-header"}>Stock ticker</p>
            <p className={"info-value"}>{analysis.stockName}</p>
          </div>
          <div className={"info-text"}>
            <p className={"info-header"}>Analysis price</p>
            <p className={"info-value"}>{analysis.analysisPrice}€</p>
          </div>
          <div className={"info-text"}>
            <p className={"info-header"}>User reviews</p>
            <p className={"info-value"}>24</p>
          </div>
          <div className={"info-text"}>
            <p className={"info-header"}>User rating</p>
            <p className={"info-value"}>65</p>
          </div>
          <button onClick={() => onClick(analysis.id)}> delete </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyseItem;