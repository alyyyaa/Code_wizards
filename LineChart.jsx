import React, { useEffect, useState } from 'react';
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

const initialData = [
  { date: '2024-04-20', count: 1.5 },
  { date: '2024-04-21', count: 2.5 },
  { date: '2024-04-22', count: 0.5 },
  { date: '2024-04-23', count: 2.5 },
  { date: '2024-04-24', count: 2.5 },
];

const LineChart = ({ startDate, endDate }) => {
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    if (startDate && endDate) {
      filterData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const filterData = (start, end) => {
    const filtered = initialData.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    });
    setFilteredData(filtered);
  };

  const data = {
    labels: filteredData.map(entry => entry.date),
    datasets: [
      {
        label: 'Количество обращений по дням',
        data: filteredData.map(entry => entry.count),
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
