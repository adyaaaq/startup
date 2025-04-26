<template>
    <div class="d-flex flex-row gap-2 align-items-center">
        <!-- ✅ Checkbox -->
        <input
            class="mt-0"
            type="checkbox"
            :checked="isSelected"
            @change="$emit('select', item.ProductId)"
            style="margin-top: 12px" />

        <!-- ✅ Main card -->
        <div class="cart-item" :class="{ selected: isSelected }">
            <div class="d-flex flex-row gap-3">
                <div class="product-image-container">
                    <img
                        :src="item.ImageUrl"
                        class="product-image"
                        alt="Product Image" />
                </div>
                <div class="d-flex flex-column gap-2 justify-content-between">
                    <p class="product-name mb-0">{{ item.ProductName }}</p>
                    <p class="product-id mb-0">{{ item.Price }}₮</p>
                </div>
            </div>

            <div class="product-quantity">
                <button @click="$emit('decrease', item.ProductId)">−</button>
                <input type="text" :value="item.quantity" readonly />
                <button @click="$emit('increase', item.ProductId)">+</button>
            </div>

            <div class="product-price">{{ item.Price.toFixed(2) }} ₮</div>

            <div>
                <button
                    class="remove-btn"
                    @click="$emit('remove', item.ProductId)">
                    ✕
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
        isSelected: Boolean,
    },
};
</script>

<style scoped>
.cart-item {
    background-color: white;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    transition: 0.2s;
}
.cart-item.selected {
    background-color: #eaf3ff;
}
.product-image {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
}
.remove-btn {
    background: none;
    border: none;
    color: red;
    font-size: 18px;
    cursor: pointer;
}
.product-quantity {
    display: flex;
    gap: 4px;
    align-items: center;
}
.product-quantity input {
    width: 40px;
    text-align: center;
}
</style>
