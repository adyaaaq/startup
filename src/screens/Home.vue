<template>
    <div class="d-flex flex-column" style="gap: 24px; margin: 0px 20px">
        <div class="carousel-container">
            <div class="big-box"></div>
            <div class="small-boxes">
                <div class="small-box green-box"></div>
                <div class="small-box blue-box"></div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-between m-4">
            <span class="medium-title">Багцууд</span>
            <button class="show-all-btn" @click="goToProducts">
                <span class="btn-text"> Бүгдийн үзэх </span>
            </button>
        </div>
        <div class="d-flex align-items-center justify-content-center w-100">
            <div
                class="d-flex justify-content-between flex-wrap gap-3 m-4 w-100">
                <specialItem />
                <specialItem />
                <specialItem />
            </div>
        </div>
        <div class="d-flex flex-row justify-content-between m-4">
            <span class="medium-title">Санал болгох</span>
            <button class="show-all-btn" @click="goToProducts">
                <span class="btn-text"> Бүгдийн үзэх </span>
            </button>
        </div>

        <div class="products-container">
            <bottleItem
                v-for="(Product, index) in Products"
                :key="index"
                :product="Product" />
            <!-- <bottleItem />
            <bottleItem />
            <bottleItem />
            <bottleItem />
            <bottleItem />
            <bottleItem />
            <bottleItem />
            <bottleItem />
            <bottleItem /> -->
        </div>
    </div>
</template>

<script>
import bottleItem from '@/components/bottleItem.vue';
import specialItem from '@/components/specialItem.vue';
export default {
    name: 'HomePage',
    components: { bottleItem, specialItem },
    data() {
        return {
            Products: [
                {
                    BranchId: 1,
                    CategoryId: 1,
                    Price: 30000,
                    ProductId: 1,
                    ProductName: 'ууыбы Арйоыбр',
                },
                {
                    BranchId: 1,
                    CategoryId: 1,
                    Price: 35000,
                    ProductId: 2,
                    ProductName: 'ууыбы Арйоыбр',
                },
            ],
        };
    },
    methods: {
        goToProducts() {
            this.$router.push({ name: 'Products' }); // Ensure 'Products' route is defined
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

    padding: 20px;
}

/* Large Box */
.big-box {
    flex: 1;
    background-color: #e38787; /* Red */
    border-radius: 20px;
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
    margin: 0px 20px 20px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
</style>
