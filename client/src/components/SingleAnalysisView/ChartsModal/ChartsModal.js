import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import BarPlot from "./BarPlot";

import "./styles/chartsModal.css";

const data = [2.2, 3.5, 6.2, 2.1, 3.2];

const ChartsModal = () => {
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
              <BarPlot values={data} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">EBIT FORECASTS</h1>
              <BarPlot values={data} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">EBITDA FORECASTS</h1>
              <BarPlot values={data} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">NET INCOME FORECASTS</h1>
              <BarPlot values={data} />
            </div>
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
};

export default ChartsModal;
