<template>
    <div class="d-flex flex-column" style="gap: 24px">
        <div class="carousel-container">
            <div class="big-box">
                <img
                    :src="require('@/assets/images/unnamed.png')"
                    alt="Suggested Set"
                    class="box-img" />
            </div>
            <div class="small-boxes">
                <div class="small-box green-box">
                    <img
                        :src="require('@/assets/images/banner2.jpg')"
                        alt="Suggested Set"
                        class="box-img" />
                </div>
                <div class="small-box blue-box">
                    <img
                        :src="require('@/assets/images/banner3.png')"
                        alt="Suggested Set"
                        class="box-img" />
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-between">
            <span class="medium-title">Багц</span>
            <button class="show-all-btn" @click="goToProducts(3)">
                <span class="btn-text"> Бүгдийн үзэх </span>
            </button>
        </div>
        <div class="d-flex align-items-center justify-content-center w-100">
            <div class="d-flex justify-content-between flex-wrap gap-3 w-100">
                <!-- <specialItem />
                <specialItem />
                <specialItem /> -->
                <specialItem
                    v-for="(Product, index) in Sets"
                    :key="index"
                    :product="Product" />
            </div>
        </div>
        <div class="d-flex flex-row justify-content-between">
            <span class="medium-title">Шингэн зүйлс</span>
            <button class="show-all-btn" @click="goToProducts(1)">
                <span class="btn-text"> Бүгдийн үзэх </span>
            </button>
        </div>

        <div class="products-container">
            <bottleItem
                v-for="(Product, index) in Products"
                :key="index"
                :product="Product" />
        </div>
        <div class="d-flex flex-row justify-content-between">
            <span class="medium-title">Цэцэг</span>
            <button class="show-all-btn" @click="goToProducts(2)">
                <span class="btn-text"> Бүгдийн үзэх </span>
            </button>
        </div>

        <div class="products-container">
            <bottleItem
                v-for="(Product, index) in Flowers"
                :key="index"
                :product="Product" />
        </div>
    </div>
</template>

<script>
import bottleItem from '@/components/bottleItem.vue';
import specialItem from '@/components/specialItem.vue';
import api from '@/services/api';
export default {
    name: 'HomePage',
    components: { bottleItem, specialItem },
    data() {
        return {
            Products: [],
            Flowers: [],
            Sets: [],
        };
    },
    async mounted() {
        const res = await api.getProducts(1, 1);
        this.Products = res;
        console.log(this.Products);
        const flowers = await api.getProducts(2, 1);
        this.Flowers = flowers;
        const sets = await api.getProducts(3, 1);
        this.Sets = sets;
    },
    methods: {
        goToProducts(op) {
            if (op == 1) {
                this.$router.push({ name: 'Products' }); // Ensure 'Products' route is defined
            }
            if (op == 3) {
                this.$router.push({ name: 'Sets' }); // Ensure 'Products' route is defined
            }
            if (op == 2) {
                this.$router.push({ name: 'Flowers' }); // Ensure 'Products' route is defined
            }
        },
    },
};
</script>

<style scoped>
/* Parent container */
.carousel-container {
    display: flex;
    align-items: stretch;
    justify-content: center;
    background-color: #f6f6f6;
    gap: 20px;
    width: 100%;
    height: 500px;
}

/* Large Box */
.big-box {
    flex: 1;
    background-color: #e38787; /* Red */
    border-radius: 20px;
}
.big-box {
    flex: 1;
    background-color: #e38787;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
}
.box-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px; /* if you want rounded corners */
}
/* Small Boxes Container */
.small-boxes {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 20px;
}

/* Small Boxes */
.small-box {
    flex: 1;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

/* Green Box */
.green-box {
    background-color: #b2e59c;
}

/* Blue Box */
.blue-box {
    background-color: #647ce6;
}

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

.medium-title {
    font-size: 24px;
    font-weight: 600;
    color: #0a5651;
}
.show-all-btn {
    padding: 12px 28px;
    border-radius: 8px;
    border: 2px solid #0a5651;
}
.btn-text {
    color: #0a5651;
    font-size: 18px;
    font-weight: 500;
}

.products-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
</style>
