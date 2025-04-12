<template>
    <nav class="navbar">
        <div class="nav-container">
            <!-- Logo / Home -->
            <router-link :to="{ name: 'Home' }" class="cart-link">
                <div class="logo">
                    <span class="black-text">Mimi Liqour</span>
                    <span class="orange-text">Shop</span>
                </div>
            </router-link>

            <!-- Hamburger (Mobile Only) -->
            <!-- Hamburger button -->
            <button class="hamburger" @click="toggleMobileMenu">☰</button>

            <!-- Animated Mobile Menu (visible on small screens only) -->
            <transition name="slide">
                <div v-if="mobileMenuVisible" class="mobile-nav-menu">
                    <router-link
                        @click.native="closeMobileMenu"
                        to="/products"
                        class="nav-item"
                        >Шингэн зүйлс</router-link
                    >
                    <router-link
                        @click.native="closeMobileMenu"
                        to="/flowers"
                        class="nav-item"
                        >Цэцэг</router-link
                    >
                    <router-link
                        @click.native="closeMobileMenu"
                        to="/login"
                        class="nav-item"
                        >Нэвтрэх</router-link
                    >
                    <router-link
                        @click.native="closeMobileMenu"
                        to="/favorites"
                        class="nav-item"
                        >💖 Favorites</router-link
                    >
                    <router-link
                        @click.native="closeMobileMenu"
                        to="/cart"
                        class="nav-item"
                        >🛒 Cart</router-link
                    >
                </div>
            </transition>

            <!-- Optional Backdrop -->
            <div
                v-if="mobileMenuVisible"
                class="backdrop"
                @click="closeMobileMenu"></div>
        </div>
    </nav>
</template>

<script>
import { EventBus } from '@/Utils/eventBus';

export default {
    name: 'AppNavbar',
    data() {
        return {
            cartItems: [],
            mobileMenuVisible: false,
        };
    },

    computed: {
        // Calculate distinct item count
        distinctItemCount() {
            return this.cartItems.length; // Number of unique products in the cart
        },
        // Calculate the total price of cart items
        totalPrice() {
            return this.cartItems.reduce(
                (sum, item) => sum + item.Price * item.quantity,
                0
            );
        },
    },
    mounted() {
        this.loadCartItems(); // Load initial cart items

        // Listen for cart updates
        EventBus.$on('cart-updated', (cartItems) => {
            this.cartItems = cartItems; // Update cartItems
        });
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuVisible = !this.mobileMenuVisible;
        },
        closeMobileMenu() {
            this.mobileMenuVisible = false;
        },
        loadCartItems() {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            this.cartItems = storedCart;
        },
    },
};
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee;
    padding: 10px 20px;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
}
.nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1600px;
}

.left-section {
    display: flex;
    align-items: center;
}

.menu-btn {
    background: white;
    border: 1px solid #ddd;
    padding: 5px 10px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
}

.logo {
    font-size: 20px;
    font-weight: bold;
}

.black-text {
    color: black;
}

.orange-text {
    color: orange;
}

.right-section {
    display: flex;
    align-items: center;
    gap: 20px;
}

.auth-link {
    margin-right: 15px;
    text-decoration: none;
    color: black;
    font-size: 14px;

    color: var(--text-color);
}

.search-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    margin-right: 15px;
}

.cart {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #f6f6f6;
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
}

.cart-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
}

.cart-total {
    margin-left: 8px;
    font-size: 14px;
    color: black;
    font-weight: 500;
}

.cart-notification {
    width: 8px;
    height: 8px;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: -2px;
    right: -2px;
}

/* Cart Container */
.cart {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
}

/* Cart Total Price */
.cart-total {
    font-size: 14px;
    font-weight: bold;
    color: #333;
}

/* Cart Notification (item count) */
.cart-notification {
    position: absolute;
    top: -5px;
    right: -8px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.hamburger {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
}

/* Slide-in animation */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}

/* Mobile nav menu */
.mobile-nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 16px;
}

/* Backdrop behind the menu */
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9998;
}

/* Hamburger button */
.hamburger {
    display: none;
    font-size: 26px;
    background: none;
    border: none;
    cursor: pointer;
}

@media (max-width: 768px) {
    .hamburger {
        display: block;
    }

    .right-section {
        display: none !important; /* Hide the normal nav */
    }
}

/* Optional styling for links inside mobile nav */
.nav-item {
    text-decoration: none;
    color: #333;
    font-weight: 600;
    font-size: 16px;
}
.nav-item:hover {
    color: orange;
}
</style>
