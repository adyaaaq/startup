<template>
    <div class="bottle-item">
        <div class="image-container">
            <!-- <img
                :src="require('@/assets/images/wine.png')"
                alt="Bottle Image"
                class="bottle-image" /> -->
            <img
                :src="product.ImageUrl"
                alt="Bottle Image"
                class="bottle-image" />
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
        <div class="bottle-info">
            <p class="bottle-name">{{ product.ProductName }}</p>
            <div
                class="d-flex flex-row justify-content-between align-items-center">
                <div class="price-section">
                    <span class="discounted-price">{{ product.Price }}₮</span>
                </div>
                <img
                    :src="require('@/assets/svgicons/cart.svg')"
                    alt="Cart Icon"
                    class="addicon"
                    style="margin-right: 8px; cursor: pointer"
                    @click="addToCart"
                    :class="{ 'animate-cart': cartAnimating }" />
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '@/Utils/eventBus';
export default {
    name: 'BottleItem',
    props: {
        product: Object,
    },
    data() {
        return {
            hover: false,
            isFavorite: false,
            favAnimating: false, // ⭐ used to trigger animation
            cartAnimating: false, // ⭐ New animation for cart
        };
    },
    mounted() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.isFavorite = favorites.includes(this.product.ProductId);
    },
    methods: {
        toggleFavorite() {
            let favorites = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );

            this.favAnimating = true;

            if (this.isFavorite) {
                favorites = favorites.filter(
                    (id) => id !== this.product.ProductId
                );
                this.isFavorite = false;
                this.$emit('remove-favorite', this.product);
            } else {
                favorites.push(this.product.ProductId);
                this.isFavorite = true;
                this.$emit('add-favorite', this.product);
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));

            // reset animation state after it runs
            setTimeout(() => {
                this.favAnimating = false;
            }, 300); // must match CSS animation duration
        },

        addToCart() {
            let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

            // Check if item already exists in cart
            const existingItem = cartItems.find(
                (item) => item.ProductId === this.product.ProductId
            );

            if (existingItem) {
                // If item exists, increase quantity
                existingItem.quantity += 1;
            } else {
                // Add new item with quantity 1
                cartItems.push({ ...this.product, quantity: 1 });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // Emit event to update cart in Navbar
            EventBus.$emit('cart-updated', cartItems);

            this.cartAnimating = true;

            setTimeout(() => {
                this.cartAnimating = false;
            }, 300);
        },
    },
};
</script>

<style scoped>
.bottle-item {
    flex: 1 1 250px;
    min-width: 250px;
    text-align: start;
}

.image-container {
    position: relative;
    background: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    border-radius: 10px;
}

.image-container:hover .bottle-image {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
}
.bottle-image {
    width: 200px;
    height: auto;
    height: 200px;
}
.addicon {
    width: 16px;
    height: 16px;
    transition: opacity 0.3s ease-in-out;
}

.add-button {
    position: absolute;
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

.bottle-info {
    margin-top: 10px;
}

.bottle-name {
    font-size: 14px;
    color: #444;
}

.price-section {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
}

.discounted-price {
    font-weight: bold;
    font-size: 16px;
}

.original-price {
    font-size: 14px;
    color: gray;
    text-decoration: line-through;
}

.animate-fav {
    animation: pop 0.3s ease;
}

@keyframes pop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.4);
    }
    100% {
        transform: scale(1);
    }
}
/* Cart animation */
.animate-cart {
    animation: pop 0.3s ease;
}

@keyframes pop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.4);
    }
    100% {
        transform: scale(1);
    }
}
</style>
