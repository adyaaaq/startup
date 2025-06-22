<template>
    <div
        class="d-flex flex-row justify-content-between order-item"
        @click="navToDetailOrder">
        <div
            class="order-header d-flex flex-column justify-content-between m-0">
            <span class="label">Захиалгын дугаар</span>
            <span class="value">{{ order.id }}</span>
        </div>

        <div class="d-flex flex-column justify-content-between">
            <div class="order-date">{{ order.date }}</div>
            <div class="order-status">
                <span>{{
                    order.status == 1
                        ? 'Төлбөр төлөгдсөн.'
                        : 'Төлбөр хүлээгдэж байна.'
                }}</span>
            </div>
        </div>

        <div class="order-products">
            <template v-for="(img, index) in order.productImages.slice(0, 3)">
                <div class="img-wrapper d-flex flex-row gap-2" :key="index">
                    <img :src="img" class="product-img" alt="product" />
                    <div
                        v-if="index === 2 && order.productImages.length > 3"
                        class="more-overlay">
                        +{{ order.productImages.length - 3 }}
                    </div>
                </div>
            </template>
        </div>

        <div class="d-flex flex-column justify-content-between order-total">
            <span class="label">Нийт үнэ</span>
            <span class="total">{{ formatPrice(order.total) }}₮</span>
        </div>
    </div>
</template>

<script>
import { setData } from '@/Utils/LocalStorage';

export default {
    name: 'OrderItem',
    props: {
        order: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatPrice(price) {
            return price.toLocaleString();
        },
        async navToDetailOrder() {
            console.log('navigating');
            await setData('selectedOrder', this.order.id);
            this.$router.push({
                name: 'Confirmation',
            });
        },
    },
};
</script>

<style scoped>
.order-item {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
}

/* 🔥 Prevent children from intercepting click */
.order-item * {
    pointer-events: none;
}

.order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

.order-id .label {
    font-size: 13px;
    color: #555;
}
.order-id .value {
    font-weight: bold;
    display: block;
}

.order-date {
    font-size: 13px;
    color: #666;
}

.order-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
}

.order-status span {
    font-size: 14px;
    font-weight: 500;
    color: #222;
}

.order-products {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.img-wrapper {
    position: relative;
    width: 40px;
    height: 40px;
}

.product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ccc;
}

.more-overlay {
    width: 40px;
    height: 100%;
    color: black;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.total {
    font-weight: bold;
    font-size: 16px;
    color: #000;
}

.order-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}
</style>
