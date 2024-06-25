import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ['2024-04-20', '2024-04-21', '2024-04-22', '2024-04-23', '2024-04-24'],
    datasets: [
      {
        label: 'Количество обращений по дням',
        data: [1.5, 2.5, 0.5, 2.5, 2.5],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
      },
    },
  };

  return (
    <div
      style={{
        width: '840px',
        height: '480px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
