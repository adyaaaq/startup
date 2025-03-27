<template>
    <div class="chart-wrapper">
        <h4>Revenue – Last 30 Days</h4>
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

// Register chart.js modules
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
);

export default {
    name: 'RevenueChart',
    components: {
        Line,
    },
    props: {
        dataPoints: {
            type: Array,
            required: true,
        },
    },
    computed: {
        chartData() {
            return {
                labels: this.dataPoints.map((d) => d.date),
                datasets: [
                    {
                        label: '₮ Revenue',
                        data: this.dataPoints.map((d) => d.revenue),
                        borderColor: '#6c63ff',
                        backgroundColor: 'rgba(108, 99, 255, 0.2)',
                        fill: true,
                        tension: 0.4,
                    },
                ],
            };
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `₮ ${context.parsed.y}`;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return `₮ ${value}`;
                            },
                        },
                    },
                },
            };
        },
    },
};
</script>

<style scoped>
.chart-wrapper {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-top: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
