<template>
    <div class="product-detail-container">
        <!-- Product Main Info -->
        <div class="product-main">
            <div style="background-color: white; width: 60%">
                <img
                    :src="product.ImageUrl"
                    class="product-image"
                    alt="Product Image" />
            </div>
            <div class="product-info">
                <div class="d-flex flex-column gap-3">
                    <div class="d-flex flex-row justify-content-between">
                        <h2>{{ product.ProductName }}</h2>
                        <button
                            class="add-button"
                            @mouseover="hover = true"
                            @mouseleave="hover = false"
                            @click="toggleFavorite">
                            <img
                                :src="
                                    isFavorite || hover
                                        ? require('@/assets/svgicons/heart.svg')
                                        : require('@/assets/svgicons/love.svg')
                                "
                                alt="Heart Icon"
                                class="addicon"
                                :class="{ 'animate-fav': favAnimating }" />
                        </button>
                    </div>
                    <div class="d-flex flex-column gap-2">
                        <span style="font-weight: 600"> Үнэ:</span>

                        <p class="price">{{ product.Price }} ₮</p>
                    </div>
                    <div class="d-flex flex-column gap-3">
                        <span style="font-weight: 600">
                            Дэлгэрэнгүй мэдээлэл:</span
                        >
                        <div
                            class="quill-content text-wrap w-100"
                            v-html="product.description"></div>
                    </div>

                    <div class="d-flex flex-row gap-3 align-items-center">
                        <div class="d-flex flex-row">
                            <div
                                class="d-flex align-items-center"
                                style="
                                    background-color: #eee;
                                    padding: 5px 10px;
                                    border-top-left-radius: 8px;
                                    border-bottom-left-radius: 8px;
                                ">
                                <span style="font-weight: 600; font-size: 14px"
                                    >тоо ширхэг</span
                                >
                            </div>
                            <b-form-select
                                v-model="quantity"
                                :options="quantiteis"
                                required
                                text-field="Quantity"
                                value-field="Quantity"
                                placeholder="тоо ширхэг"
                                class="form-select"
                                style="
                                    width: 70px;
                                    border-top-left-radius: 0px;
                                    border-bottom-left-radius: 0px;
                                " />
                        </div>
                        <div>
                            <p>
                                {{ this.product.quantity }} ширхэг бэлэн байна.
                            </p>
                        </div>
                    </div>

                    <!-- <div class="quantity-control">
                        <button @click="decreaseQuantity">−</button>
                        <input type="text" :value="product.quantity" readonly />
                        <button @click="increaseQuantity">+</button>
                    </div> -->
                </div>
                <div class="d-flex flex-row gap-2">
                    <button class="add-to-cart-btn" @click="addToCart">
                        Сагсанд нэмэх
                    </button>
                    <button class="add-to-cart-btn" @click="addToCart">
                        Худалдан авах
                    </button>
                </div>
            </div>
        </div>

        <!-- Suggested Products -->
        <div class="suggested-products">
            <h3>Санал болгож буй бүтээгдэхүүнүүд</h3>
            <div class="suggested-grid">
                <bottleItem
                    v-for="(Product, index) in suggestedProducts"
                    :key="index"
                    :product="Product" />
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';
import bottleItem from '@/components/bottleItem.vue';

export default {
    name: 'ProductDetail',
    components: { bottleItem },
    data() {
        return {
            product: {}, // product details
            quantity: 1,
            suggestedProducts: [],
            quantiteis: [],
            favAnimating: false, // ⭐ used to trigger animation
            hover: false,
            isFavorite: false,
        };
    },
    methods: {
        toggleFavorite() {
            console.log('togglin');
        },
        async fetchProduct() {
            const id = this.$route.query.id; // assuming your route is /product/:id
            const res = await api.getProduct(id);
            this.product = res;
            for (var i = 0; i < this.product.quantity; i++) {
                this.quantiteis.push(i + 1);
            }
        },
        async fetchSuggestedProducts() {
            const res = await api.getProducts(this.product.Type);
            this.suggestedProducts = res.filter(
                (p) => p.ProductId !== this.product.ProductId
            );
        },
        increaseQuantity() {
            this.product.quantity++;
        },
        decreaseQuantity() {
            if (this.product.quantity > 1) this.product.quantity--;
        },
        addToCart() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existing = cart.find(
                (item) => item.ProductId === this.product.ProductId
            );

            if (existing) {
                existing.quantity += this.quantity;
            } else {
                cart.push({ ...this.product, quantity: this.quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Сагсанд амжилттай нэмэгдлээ!');
        },
    },
    async mounted() {
        await this.fetchProduct();
        await this.fetchSuggestedProducts();
    },
};
</script>

<style scoped>
.product-detail-container {
    margin-left: 40px;
    margin-right: 40px;
}

.product-main {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
}

.product-image {
    width: 100%;
    padding: 20px;
    object-fit: cover;
    border-radius: 12px;
}

.product-info {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 12px;
}

.price {
    font-size: 24px;
    font-weight: 700;
}

.quantity-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.quantity-control button {
    background: transparent;
    border: 1px solid #ccc;
    width: 32px;
    height: 32px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 8px;
}

.quantity-control input {
    width: 40px;
    text-align: center;
    border: none;
}

.add-to-cart-btn {
    width: 100%;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
}

.suggested-products {
    margin-top: 40px;
}

.suggested-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.suggested-item {
    text-align: center;
}

.suggested-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

.suggested-name {
    margin: 8px 0 4px 0;
    font-weight: 600;
}

.suggested-price {
    color: #888;
    font-size: 14px;
}

.addicon {
    width: 16px;
    height: 16px;
    transition: opacity 0.3s ease-in-out;
}

.add-button {
    top: 10px;
    right: 10px;
    background: transparent; /* ✅ transparent background */
    border: none;
    font-size: 18px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
