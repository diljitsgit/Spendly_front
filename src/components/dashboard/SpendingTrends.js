import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SpendingTrends = ({ data = null }) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Needs',
        data: [300, 250, 320, 350],
        backgroundColor: 'rgba(0, 200, 83, 0.6)',
        borderColor: 'rgba(0, 200, 83, 1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Wants',
        data: [150, 100, 180, 120],
        backgroundColor: 'rgba(255, 61, 0, 0.6)',
        borderColor: 'rgba(255, 61, 0, 1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartData = data || defaultData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#b0b0b0',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: 'rgba(0, 200, 83, 0.3)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          borderDash: [5, 5],
        },
        ticks: {
          color: '#b0b0b0',
        },
        min: 0,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#b0b0b0',
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      }
    }
  };

  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ color: '#00c853', mb: 2 }}>
          Spending Trends
        </Typography>
        <Box sx={{ height: 300, width: '100%' }}>
          <Line options={options} data={chartData} height={300} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpendingTrends; 