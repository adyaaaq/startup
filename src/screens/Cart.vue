<template>
    <div class="cart-page">
        <div class="d-flex flex-row gap-3 align-items-center">
            <p class="direction" style="color: orange">Миний сагс</p>
            <img
                :src="require('@/assets/svgicons/next.svg')"
                class="lil-icon"
                alt="next icon" />
            <p class="direction">Захиалгын хаяг</p>
            <img
                :src="require('@/assets/svgicons/next.svg')"
                class="lil-icon"
                alt="next icon" />
            <p class="direction">Баталгаажуулах</p>
        </div>

        <div class="d-flex flex-row gap-4 flex-wrap">
            <div class="d-flex col flex-column">
                <h4 class="mt-4 mb-3">Миний сагс</h4>
                <table class="cart-table">
                    <thead class="cart-table-thead">
                        <tr>
                            <th>Бүтээгдэхүүн</th>
                            <th
                                style="
                                    vertical-align: middle;
                                    text-align: center;
                                    min-width: 150px;
                                ">
                                Тоо хэмжээ
                            </th>
                            <th
                                style="
                                    vertical-align: middle;
                                    text-align: center;
                                ">
                                Үнэ
                            </th>
                            <th
                                style="
                                    vertical-align: middle;
                                    text-align: center;
                                "></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cartItems" :key="index">
                            <td class="product-info">
                                <div class="product-image-container">
                                    <img
                                        :src="item.image"
                                        class="product-image"
                                        alt="Product Image" />
                                </div>
                                <div
                                    class="d-flex flex-column gap-2 justify-content-between">
                                    <p class="product-name mb-0">
                                        {{ item.name }}
                                    </p>
                                    <p class="product-id mb-0">
                                        {{ item.price }}₮
                                    </p>
                                </div>
                            </td>
                            <td class="product-quantity">
                                <button @click="decreaseQuantity(index)">
                                    −
                                </button>
                                <input
                                    type="text"
                                    v-model="item.quantity"
                                    readonly />
                                <button @click="increaseQuantity(index)">
                                    +
                                </button>
                            </td>
                            <td class="product-price">
                                ${{ item.price.toFixed(2) }}
                            </td>
                            <td>
                                <button
                                    class="remove-btn"
                                    @click="removeItem(index)">
                                    ✕
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex col flex-column">
                <h4 class="mt-4 mb-3">Хүргэлтийн хаяг</h4>
                <div class="d-flex flex-column justify-content-between h-100">
                    <div
                        class="d-flex loc-cont flex-wrap justify-content-between">
                        <locationItem
                            v-for="item in LocationItems"
                            :key="item.id"
                            :location="item"
                            :selected="selectedId"
                            @select="selectLocation"
                            @edit="openEditModal"
                            @remove="openRemoveModal" />
                    </div>
                    <div class="d-flex flex-row w-100" v-if="!locAddFormShow">
                        <button class="btn-secondar mt-4 w-100" @click="toggle">
                            Хүргэлтийн хаяг нэмэх
                        </button>
                    </div>
                    <div class="d-flex flex-row w-100 gap-4" v-else>
                        <button class="btn-secondar mt-4 col" @click="toggle">
                            цуцлах
                        </button>
                        <button class="btn-primary mt-4 col" @click="toggle">
                            хадгалах
                        </button>
                    </div>
                    <div
                        v-if="locAddFormShow"
                        class="row-2 d-flex flex-row gap-3 mt-3 align-items-end">
                        <div class="d-flex flex-column gap-1">
                            <p>Хаягийн нэр</p>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <p>Хот</p>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <p>Дүүрэг</p>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <p>Хороо</p>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="add-icon-container">
                            <img
                                :src="require('@/assets/svgicons/add.svg')"
                                class="add-icon"
                                alt="add icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cart Table -->

        <!-- Summary Section -->
        <div class="cart-summary">
            <div class="summary-box">
                <!-- <p>
                    Delivery <span>${{ deliveryFee.toFixed(2) }}</span>
                </p> -->
            </div>
            <div class="summary-box">
                <p class="total">
                    Нийт төлбөр: <span> {{ total.toFixed(2) }}₮</span>
                </p>
            </div>
        </div>
        <!-- Buttons -->
        <div class="cart-buttons">
            <!-- <button class="back-btn">Back to Shop</button> -->
            <button class="checkout-btn">Үргэлжүүлэх</button>
        </div>
    </div>
</template>

<script>
import locationItem from '@/components/locationItem.vue';
export default {
    name: 'CartPage',
    components: { locationItem },
    data() {
        return {
            cartItems: [
                {
                    id: '4553458120',
                    name: 'Top for Women',
                    size: 'L',
                    quantity: 2,
                    price: 50.0,
                    image: require('@/assets/images/wine.png'),
                },
                {
                    id: '8953458747',
                    name: 'Blue T-shirt for Men',
                    size: 'M',
                    quantity: 2,
                    price: 50.0,
                    image: require('@/assets/images/wine.png'),
                },
                {
                    id: '2011458796',
                    name: 'Pink Shirt for Men',
                    size: 'XL',
                    quantity: 2,
                    price: 50.0,
                    image: require('@/assets/images/wine.png'),
                },
            ],
            LocationItems: [
                {
                    id: 1,
                    title: 'test1',
                    niislel: 'niislel',
                    duureg: 'duureg',
                    horoo: 'horoo',
                },
                {
                    id: 2,
                    title: 'test1',
                    niislel: 'niislel',
                    duureg: 'duureg',
                    horoo: 'horoo',
                },
                {
                    id: 3,
                    title: 'test1',
                    niislel: 'niislel',
                    duureg: 'duureg',
                    horoo: 'horoo',
                },
            ],
            deliveryFee: 20.0,

            selectedOption: 'option1',
            locAddFormShow: false,
        };
    },
    computed: {
        subtotal() {
            return this.cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        },
        total() {
            return this.subtotal + this.deliveryFee;
        },
    },
    methods: {
        increaseQuantity(index) {
            this.cartItems[index].quantity++;
        },
        decreaseQuantity(index) {
            if (this.cartItems[index].quantity > 1) {
                this.cartItems[index].quantity--;
            }
        },
        removeItem(index) {
            this.cartItems.splice(index, 1);
        },
        toggle() {
            console.log('locAddFormShow', this.locAddFormShow);
            this.locAddFormShow = !this.locAddFormShow;
        },
        selectLocation(location) {
            this.selectedId = location.id;
            this.selectedLocation = location;
        },
        openEditModal(location) {
            this.selectedLocation = location;
            this.editModalVisible = true;
        },
        openRemoveModal(location) {
            this.selectedLocation = location;
            this.removeModalVisible = true;
        },
    },
};
</script>

<style scoped>
/* Page Layout */
.cart-page {
    margin: 0 auto;
    padding: 20px 40px;
}

/* .cart-title {
    text-align: start;
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
} */

/* Cart Table */
.cart-table {
    width: 100%;
    border-collapse: collapse;
}
.cart-table thead {
    background-color: #eeeeee;
    /* background-color: green; */
}
.cart-table th {
    text-align: left;
    font-weight: bold;
    padding: 10px;

    color: gray;
}

.cart-table td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

.product-info {
    display: flex;
    align-items: center;
    gap: 10px;
}
.product-image-container {
    width: 50px;
    text-align: center;
}
.product-image {
    width: auto;
    height: 50px;
    border-radius: 5px;
}

.product-name {
    font-size: 14px;
    font-weight: bold;
}

.product-id {
    font-size: 12px;
    color: gray;
}

.product-size {
    text-align: center;
    font-size: 14px;
}

.product-quantity {
    /* display: flex; */
    flex-direction: row;
    text-align: center;
    gap: 5px;
}

.product-quantity button {
    border: none;
    background: #f0f0f0;
    padding: 5px 10px;
    cursor: pointer;
}

.product-quantity input {
    width: 30px;
    text-align: center;
    border: none;
    font-size: 14px;
    background: transparent;
}

.product-price {
    font-size: 14px;
    text-align: center;
    font-weight: bold;
}

.remove-btn {
    border: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
    color: gray;
    vertical-align: center;
}

/* Summary Section */
.cart-summary {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
}

.summary-box p {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}

.summary-box span {
    font-weight: bold;
}

.total {
    font-size: 16px;
    font-weight: bold;
}

/* Promo Code Section */
.promo-section {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.promo-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.apply-btn {
    background: #6c63ff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

/* Buttons */
.cart-buttons {
    display: flex;
    justify-content: end;
    margin-top: 20px;
}

.back-btn {
    background: black;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.checkout-btn {
    background: #6c63ff;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
.lil-icon {
    width: 16px;
    height: 16px;
}
.direction {
}
.add-icon {
    height: 8px;
    width: 8px;
}
.add-icon-container {
    display: flex;
    height: 16px;
    width: 16px;
    justify-content: center;
    align-items: center;
    border: 1px black solid;
    border-radius: 100px;
    margin-bottom: 10px;
}

.locItem-container {
    /* width: 200px; */
    min-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    justify-content: space-between;
    background-color: #eeeeee;
    border-radius: 12px;
    padding: 12px;
    flex: 1;
}
.locTitle {
    font-weight: 600;
    font-size: 14px;
    text-overflow: ellipsis;
}

.loc-cont {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
</style>
