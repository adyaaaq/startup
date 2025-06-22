<template>
    <div>
        <h2 class="mb-4">Захиалгууд</h2>
        <orderItem
            v-for="order in orders"
            :key="order.OrderId"
            :order="order" />
    </div>
</template>

<script>
import api from '@/services/api';
import { getData } from '@/Utils/LocalStorage';
import orderItem from '@/components/orderItem.vue';
export default {
    name: 'Orders',
    components: { orderItem },
    data() {
        return {
            activeTab: 0,
            userData: null,
            orders: null,
        };
    },
    mounted() {
        this.userData = getData('userData');
        this.fetOrders();
    },
    methods: {
        async fetOrders() {
            this.orders = await api.getOrdersByUser(this.userData.id);
            console.log('we got orders ', this.orders);
        },
    },
};
</script>

<style></style>
