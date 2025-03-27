<template>
    <div class="chart-wrapper">
        <h4>Top Sold Products</h4>
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    name: 'TopProductsChart',
    components: { Bar },
    props: {
        products: Array,
    },
    computed: {
        chartData() {
            return {
                labels: this.products.map((p) => p.name),
                datasets: [
                    {
                        label: 'Units Sold',
                        backgroundColor: '#6c63ff',
                        data: this.products.map((p) => p.sales),
                    },
                ],
            };
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
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
