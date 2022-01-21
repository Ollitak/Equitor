import React from "react";
import "./AnalyseItem.css";
import { useHistory } from "react-router-dom";
import { deleteAnalysis } from "../reducers/analysisReducer";
import { useDispatch } from "react-redux";

const AnalyseItem = ({ analysis, myPage }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const removeItem = async (id) => {
    dispatch(deleteAnalysis(id));
  };

  const moveToSingleView = () => {
    history.push(`analysis/${analysis.id}`);
  };

  return(
    <div>
      <div className={"container"} onClick={moveToSingleView}>
        <img src={analysis.stockInformation.logoUrl} className={"image"}></img>
        <div className={"text-container"}>
          <p className={"title"}>{analysis.title}</p>
          <div className={"tools-container"}>
            {analysis.keyWords.map((keyWord,id) =>
              <p className={"tools"} key={id}>{keyWord}</p>
            )}
          </div>
          <div className={"info-container"}>
            <div className={"info-text"}>
              <p className={"info-header"}>Stock ticker</p>
              <p className={"info-value"}>{analysis.stockInformation.ticker}</p>
            </div>
            <div className={"info-text"}>
              <p className={"info-header"}>Price forecast</p>
              <p className={"info-value"}>{analysis.stockPriceEstimate}€</p>
            </div>
            <div className={"info-text"}>
              <p className={"info-header"}>User reviews</p>
              <p className={"info-value"}>24</p>
            </div>
            <div className={"info-text"}>
              <p className={"info-header"}>User rating</p>
              <p className={"info-value"}>65</p>
            </div>
          </div>
        </div>
      </div>
      {/* Only allow delete if user is on myPage */}
      {
        myPage
          ? <button onClick={() => removeItem(analysis.id)}> delete </button>
          : null
      }
    </div>
  );
};

export default AnalyseItem;