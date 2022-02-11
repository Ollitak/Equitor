import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BarPlot = ({ values }) => {
  const labels = [2021, 2022, 2023, 2024, 2025];
  const yMax = Math.trunc(Math.max(...values) * 1.5);

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
        },
        suggestedMax: yMax
      }
    },
    backgroundColor: "#ff7d00",
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
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
    }
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
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
