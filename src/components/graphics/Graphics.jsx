import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graphics = ({ data, dataType }) => {
  const chartData = {
    labels: data.labels,
    datasets:
      dataType === "desinfection"
        ? [
            {
              label: "Vehículos Desinfectados",
              data: data.desinfected,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Vehículos No Desinfectados",
              data: data.notDesinfected,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ]
        : [
            {
              label: "Consumo de Agua (litros)",
              data: data.waterConsumption,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Consumo de Desinfectante (litros)",
              data: data.disinfectantConsumption,
              backgroundColor: "rgba(255, 159, 64, 0.6)",
            },
          ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          dataType === "desinfection"
            ? "Vehículos Desinfectados vs No Desinfectados"
            : "Consumo de Agua y Desinfectante por Día",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Graphics;
