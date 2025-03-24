<template>
    <div class="sale-item-container">
        <div class="d-flex flex-column item-texts">
            <span>asd</span>
            <span>asd</span>
        </div>
        <img
            class="item-img"
            :src="require('@/assets/images/wine.png')"
            alt="My Image" />
    </div>
</template>

<script>
export default {
    name: 'SpecialItem',
};
</script>

<style scoped>
/* Container */

.sale-item-container {
    background-color: #eeeeee;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    width: 300px;
    flex-direction: row;
    justify-content: space-between;
}

.item-texts {
    display: flex;
    /* align-items: flex-end; */
    justify-content: end;
}
.item-img {
    height: 200px;
}
</style>
