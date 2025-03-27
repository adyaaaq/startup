<template>
    <div class="admin-dashboard">
        <h2 class="page-title">Admin Dashboard</h2>

        <div class="stats-grid">
            <div class="stat-card">
                <h4>Total Users</h4>
                <p>{{ stats.users }}</p>
            </div>
            <div class="stat-card">
                <h4>Orders</h4>
                <p>{{ stats.orders }}</p>
            </div>
            <div class="stat-card">
                <h4>Sales</h4>
                <p>{{ stats.sales }}</p>
            </div>
            <div class="stat-card">
                <h4>Revenue</h4>
                <p>${{ stats.revenue }}</p>
            </div>
        </div>
        <div class="d-flex gap-2 flex-wrap">
            <TopProductsChart style="flex: 1" :products="topProducts" />
            <RevenueChart style="flex: 1" :dataPoints="lastMonthRevenue" />
        </div>
    </div>
</template>

<script>
import TopProductsChart from './TopProductsChart.vue';
import RevenueChart from './RevenueChart.vue';
export default {
    name: 'DashboardPage',
    components: { TopProductsChart, RevenueChart },
    data() {
        return {
            stats: {
                users: 1523,
                orders: 893,
                sales: 689,
                revenue: 15420,
            },
            topProducts: [
                { name: 'Wine A', sales: 120 },
                { name: 'Whiskey B', sales: 95 },
                { name: 'Vodka C', sales: 80 },
                { name: 'Gin D', sales: 60 },
                { name: 'Rum E', sales: 45 },
                { name: 'Vodka C', sales: 8 },
                { name: 'Gin D', sales: 16 },
                { name: 'Rum E', sales: 35 },
            ],
            lastMonthRevenue: this.generateMockRevenue(),
        };
    },
    methods: {
        generateMockRevenue() {
            const data = [];
            const today = new Date();
            console.log('generated: ');
            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                data.push({
                    date: date.toISOString().slice(0, 10),
                    revenue: Math.floor(1000 + Math.random() * 4000), // Random ₮
                });
            }
            return data;
        },
    },
};
</script>

<style scoped>
.admin-dashboard {
    padding: 20px;
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
}

.stat-card {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-card h4 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
}

.stat-card p {
    font-size: 24px;
    font-weight: bold;
    color: #6c63ff;
    margin: 0;
}
</style>
