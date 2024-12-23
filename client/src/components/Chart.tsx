// import React from "react";
import { Chart as ChartJS, CategoryScale, PointElement, LinearScale, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

//Set ups type/interface for data handed down through props:
type importedNumberData = {
  hourlyData: number[];
  symbol: string;
}

const LineChart = ({hourlyData, symbol}: importedNumberData) => {

    const data = {
        labels: ["4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"], // X-axis labels
        datasets: [
          {
            label: "Hourly Price",
            data: [...hourlyData], // Data points for the line
            borderColor: "rgba(75, 192, 192, 1)", // Line color
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color under the line
            tension: 0.1, // Smoothness of the curve
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
            text: `${symbol} Daily Chart`,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time of the Day (EST)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Stock Price ($)",
            },
          },
        },
      };
    
      return <Line data={data} options={options} />;

    };
export default LineChart;
