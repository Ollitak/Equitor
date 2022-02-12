import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BarPlot = ({ values }) => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
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
    backgroundColor: "#ff7d00",
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        formatter: (value) => value.forecast,
        color: "white",
        align: "end",
        anchor: "end",
        labels: {
          title: {
            font: {
              weight: "bold"
            }
          }
        }
      }
    },
    parsing: {
      xAxisKey: "year",
      yAxisKey: "forecast"
    }
  };

  const data = {
    datasets: [
      {
        data: values,
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <Bar data={data} plugins={[ChartDataLabels]} options={options} height="150" />
    </div>
  );
};

export default BarPlot;
