
import React from "react";
import { Line } from "react-chartjs-2";
// Import necessary chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Create the chart data generation function
const generateChartData = (labels: string[], data: number[]) => ({
  labels,
  datasets: [
    {
      label: "Analytics Data",
      data,
      borderColor: "#4C8BF5", // Line color
      backgroundColor: "rgba(76, 139, 245, 0.2)", // Fill color
      fill: true,
      tension: 0.4,
    },
  ],
});

export const WhatsAppNotificationChart = () => {
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const data = [100, 150, 200, 180];

  const chartData = generateChartData(labels, data);

  return (
    <div className="chart-container">
      <h3 className="text-center mb-4">WhatsApp Notification Milestones</h3>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export const SearchVolumeChart = () => {
  const labels = ["Keyword A", "Keyword B", "Keyword C", "Keyword D"];
  const data = [50, 200, 150, 300];

  const chartData = generateChartData(labels, data);

  return (
    <div className="chart-container">
      <h3 className="text-center mb-4">Keyword Search Volume</h3>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export const YouTubeAnalysisChart = () => {
  const labels = ["Video 1", "Video 2", "Video 3", "Video 4"];
  const data = [1000, 1500, 1200, 1800];

  const chartData = generateChartData(labels, data);

  return (
    <div className="chart-container">
      <h3 className="text-center mb-4">YouTube Video Analysis</h3>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};
