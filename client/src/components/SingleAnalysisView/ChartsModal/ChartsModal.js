import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import BarPlot from "./BarPlot";

import "./styles/chartsModal.css";

const ChartsModal = ({ analysis }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Modal
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
      trigger={<button className="sav-left-button">CHARTS</button>}
      size="large">
      <div className="cm">
        <div className="cm-wrapper">
          <div className="cm-header">CHARTS</div>
          <Modal.Content scrolling>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">REVENUE FORECASTS</h1>
              <BarPlot values={analysis.financialForecasts.revenueForecast} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">EBIT FORECASTS</h1>
              <BarPlot values={analysis.financialForecasts.ebitdaForecast} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">EBITDA FORECASTS</h1>
              <BarPlot values={analysis.financialForecasts.ebitForecast} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">NET INCOME FORECASTS</h1>
              <BarPlot values={analysis.financialForecasts.netIncomeForecast} />
            </div>
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
};

export default ChartsModal;
