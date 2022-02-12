import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import BarPlot from "./BarPlot";

import "./styles/chartsModal.css";

const financialForecasts = {
  revenueForecasts: [
    {
      year: "2021",
      forecast: 2.1
    },
    {
      year: "2022",
      forecast: 2.3
    },
    {
      year: "2023",
      forecast: 2.5
    },
    {
      year: "2024",
      forecast: 2.7
    },
    {
      year: "2025",
      forecast: 2.8
    }
  ],
  ebitForecasts: [
    {
      year: "2021",
      forecast: 2.1
    },
    {
      year: "2022",
      forecast: 2.7
    },
    {
      year: "2023",
      forecast: 2.9
    },
    {
      year: "2024",
      forecast: 3.1
    },
    {
      year: "2025",
      forecast: 6.2
    }
  ],
  ebitdaForecasts: [
    {
      year: "2021",
      forecast: 2.1
    },
    {
      year: "2022",
      forecast: 2.3
    },
    {
      year: "2023",
      forecast: 2.5
    },
    {
      year: "2024",
      forecast: 2.7
    },
    {
      year: "2025",
      forecast: 2.8
    }
  ],
  netIncomeForecasts: [
    {
      year: "2021",
      forecast: 2.1
    },
    {
      year: "2022",
      forecast: 2.3
    },
    {
      year: "2023",
      forecast: 2.5
    },
    {
      year: "2024",
      forecast: 2.7
    },
    {
      year: "2025",
      forecast: 2.8
    }
  ]
};

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
              <BarPlot values={financialForecasts.revenueForecasts} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">EBIT FORECASTS</h1>
              <BarPlot values={financialForecasts.ebitdaForecasts} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">EBITDA FORECASTS</h1>
              <BarPlot values={financialForecasts.ebitForecasts} />
            </div>
            <div className="cm-chart-container">
              <h1 className="cm-chart-title">NET INCOME FORECASTS</h1>
              <BarPlot values={financialForecasts.netIncomeForecasts} />
            </div>
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
};

export default ChartsModal;
