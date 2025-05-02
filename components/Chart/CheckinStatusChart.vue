<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 模擬資料（可用 props 傳入實際值）
const chartData = {
  labels: ['Student A', 'Student B', 'Student C', 'Student D'],
  datasets: [
    {
      label: 'Checked In',
      data: [5, 3, 4, 2],
      backgroundColor: '#4CAF50', // 綠色
    },
    {
      label: 'Missed',
      data: [2, 1, 0, 3],
      backgroundColor: '#F44336', // 紅色
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Check-In vs Missed',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
}
</script>
