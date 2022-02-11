import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentSectionModal from "./CommentSectionModal";
import FullAnalysisModal from "./FullAnalysisModal";
import { Divider, Label } from "semantic-ui-react";

import "./styles/singleAnalysisView.css";

const RecommendationLabel = ({ recommendation }) => {
  switch (recommendation) {
    case "BUY":
      return (
        <Label color="green" size="huge">
          BUY
        </Label>
      );
    case "HOLD":
      return (
        <Label color="yellow" size="huge">
          HOLD
        </Label>
      );
    case "SELL":
      return (
        <Label color="red" size="huge">
          SELL
        </Label>
      );
    default:
      return (
        <Label color="black" size="huge">
          N/A
        </Label>
      );
  }
};

const SingleAnalysisView = () => {
  const { id } = useParams();

  /* Retreive analysis that corresponds to the id in url path */
  const analysis = useSelector((state) => state.analyses.find((a) => a.id === id));

  /* Return null if analysis is not defined ie. if the page is refreshed
  with current route or incorrect route is used. */
  if (!analysis) return null;

  return (
    <div className="sav">
      <div className="sav-left">
        <div className="sav-left-wrapper">
          <h1 className="sav-title">OPTIONS</h1>
          <button className="sav-left-button">CHARTS</button>
          <FullAnalysisModal analysis={analysis} id={id} />
          <CommentSectionModal analysis={analysis} id={id} />
          <button className="sav-left-button">RETURN</button>
        </div>
      </div>

      <div className="sav-center">
        <div className="sav-center-wrapper">
          <h1 className="sav-title">{analysis.title}</h1>
          <Divider horizontal className="sav-center-divider">
            report published by {analysis.user.username}
          </Divider>
          <div className="sav-summary-container">
            <p className="sav-summary">{analysis.content.summary}</p>
          </div>
        </div>
      </div>
      <div className="sav-right">
        <div className="sav-right-wrapper">
          <h1 className="sav-title">SUMMARY</h1>
          <div className="sav-right-item-container">
            <div>
              <h1 className="sav-right-item-title">COMPANY</h1>
            </div>
            <div className="sav-right-image-container">
              <img className="sav-right-image" src={analysis.stockInformation.logoUrl} alt=""></img>
            </div>
          </div>
          <div className="sav-right-item-container">
            <h1 className="sav-right-item-title">RECOMMENDATION</h1>
            <RecommendationLabel recommendation={analysis.recommendation} />
          </div>
          <div className="sav-right-item-container">
            <h1 className="sav-right-item-title">TARGET PRICE</h1>
            <Label tag size="big">
              € {analysis.targetPrice}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAnalysisView;
