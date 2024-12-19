import React from "react";
import { Chart as ChartJS, CategoryScale, PointElement, LinearScale, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FC = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May"], // X-axis labels
        datasets: [
          {
            label: "Sales",
            data: [65, 59, 80, 81, 56], // Data points for the line
            borderColor: "rgba(75, 192, 192, 1)", // Line color
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color under the line
            tension: 0.4, // Smoothness of the curve
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Sales Over Time",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
            },
          },
          y: {
            title: {
              display: true,
              text: "Sales",
            },
          },
        },
      };
    
      return <Line data={data} options={options} />;
    };
export default LineChart;
