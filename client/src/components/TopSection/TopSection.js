import React from "react";
import NavigationBar from "./NavigationBar";
import Background from "../../images/background.jpg";
import "./styles/topSection.css";

const TopSection = () => {
  return (
    <div className="ts">
      <img src={Background} alt="" className="ts-image" />
      <NavigationBar />
      <div className="ts-text-container">
        <h1 className="ts-text-appname">EQUITOR</h1>
        <p className="ts-text-subheader">/ keep up with the stock market</p>
      </div>
    </div>
  );
};

export default TopSection;
