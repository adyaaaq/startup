<template>
    <div class="sale-item-container">
        <div class="d-flex flex-column item-texts">
            <span style="font-size: large; font-weight: 600">{{
                this.product.ProductName
            }}</span>
            <span>{{ this.product.Price }}₮</span>
        </div>
        <img class="item-img" :src="product.ImageUrl" alt="Suggested Set" />
    </div>
</template>

<script>
export default {
    props: {
        product: Object,
    },
    name: 'SpecialItem',
    mounted() {
        console.log(this.product);
    },
};
</script>

<style scoped>
/* Container */

.sale-item-container {
    background-color: white !important;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    width: 470px !important;
    flex-direction: row;
    justify-content: space-between;
}

.item-texts {
    display: flex;
    /* align-items: flex-end; */
    justify-content: end;
}
.item-img {
    height: 300px;
}
</style>
