import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const initialDailyRequests = [
  { date: '2023-05-01', count: 10 },
  { date: '2023-05-02', count: 20 },
  { date: '2023-05-03', count: 5 },
  { date: '2023-05-04', count: 15 },
];

const Card = ({ startDate, endDate }) => {
  const [dailyRequests, setDailyRequests] = useState(initialDailyRequests);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      filterData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const filterData = (start, end) => {
    const filteredRequests = initialDailyRequests.filter(request => {
      const requestDate = new Date(request.date);
      return requestDate >= start && requestDate <= end;
    });

    setDailyRequests(filteredRequests);
    setTotalRequests(filteredRequests.reduce((sum, day) => sum + day.count, 0));
  };

  const data = {
    labels: dailyRequests.map(day => day.date),
    datasets: [
      {
        data: dailyRequests.map(day => day.count),
        fill: true,
        backgroundColor: 'rgba(173, 216, 230, 0.2)',
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 2,
        pointRadius: 0, 
      },
    ],
  };

  const options = {
    scales: {
      y: {
        display: false, 
      },
      x: {
        display: false, 
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    layout: {
      padding: 0,
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px', width: '207px', height: '250px', textAlign: 'center', backgroundColor: '#fff' }}>
      <div style={{ fontSize: '24px', marginBottom: '10px', marginTop: '20px' }}>
        <span style={{ color: '#007bff' }}>&#10003;</span>
      </div>
      <div style={{ fontSize: '30px', marginBottom: '29px' }}>{totalRequests}</div>
      <div style={{ fontSize: '15px', color: '#5A5A65' }}>Обращений рассмотрено</div>
      <div style={{ marginTop: '20px', height: '100px', width: '100%', padding: 0 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Card;
