/* eslint-disable no-loss-of-precision */
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

/** Component renders stock price chart included within single analysis view.
 *  StockData is retreived in SingleAnalysisView component and passed as a prop.
 */

const StockPriceChart = ({ stockData }) => {
  // API call is asyncronous
  if (!stockData) return null;

  // Data from Yahoo API is in UNIX date format and here it is mapped into JS date format
  const timestamps = stockData.chart.result[0].timestamp.map((time) => {
    return new Date(time * 1000);
  });

  const closePrices = stockData.chart.result[0].indicators.quote[0].close;

  // Store time and price data into array of objects, in which each object contain time and closing price
  var plotObjects = [];
  for (var i = 0; i < timestamps.length; i++) {
    plotObjects[i] = { time: timestamps[i], closePrice: closePrices[i] };
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MMM dd"
        },
        ticks: {
          color: "white",
          font: 100
        }
      },
      y: {
        grid: {
          color: "white",
          borderColor: "white"
        },
        ticks: {
          color: "white",
          font: 100
        }
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    borderColor: "#ff7d00",
    backgroundColor: "#ff7d00",
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {
      xAxisKey: "time",
      yAxisKey: "closePrice"
    }
  };

  const data = {
    datasets: [
      {
        data: plotObjects
      }
    ]
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default StockPriceChart;
