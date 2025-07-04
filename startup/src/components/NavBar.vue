<template>
    <nav class="navbar">
        <div class="nav-container">
            <!-- Logo / Home -->
            <router-link
                :to="{ name: 'Home' }"
                class="cart-link no-bg"
                style="padding-left: 0px">
                <div class="logo">
                    <span class="black-text">Mimi Liqour</span>
                    <span class="orange-text">Shop</span>
                </div>
            </router-link>

            <!-- Right Section -->
            <div class="right-section">
                <router-link :to="{ name: 'Products' }" class="cart-link">
                    <span class="auth-link">Шингэн зүйлс </span>
                </router-link>
                <router-link :to="{ name: 'Flowers' }" class="cart-link">
                    <span class="auth-link">Цэцэг </span>
                </router-link>
                <router-link :to="{ name: 'Sets' }" class="cart-link">
                    <span class="auth-link">Багц </span>
                </router-link>

                <!-- Favorites -->
                <router-link :to="{ name: 'Favorites' }" class="cart-link">
                    <img
                        class="svgicon"
                        style="height: 16px; width: 16px"
                        src="@/assets/svgicons/love.svg"
                        alt="Favorites Icon" />
                </router-link>

                <!-- Cart -->
                <a
                    @click="navigateToCart"
                    class="cart-link no-bg"
                    style="padding-right: 0px">
                    <div class="cart">
                        <img
                            class="svgicon"
                            src="@/assets/svgicons/cart.svg"
                            alt="Cart Icon" />
                        <span
                            v-if="distinctItemCount > 0"
                            class="cart-notification">
                            {{ distinctItemCount }}
                        </span>
                        <span class="cart-total"
                            >{{ totalPrice.toLocaleString() }}₮</span
                        >
                    </div>
                </a>
                <a
                    @click="handleUserNav"
                    class="cart-link gap-2 align-items-center">
                    <img
                        class="svgicon"
                        style="height: 16px; width: 16px"
                        src="@/assets/svgicons/user.svg"
                        alt="User Icon" />

                    <p v-if="userData">{{ userData.fname }}</p>
                    <p v-else>Нэвтрэх</p>
                </a>
                <!-- <router-link :to="{ name: 'Login' }" class="cart-link">
                    <img
                        class="svgicon"
                        style="height: 16px; width: 16px"
                        src="@/assets/svgicons/user.svg"
                        alt="Favorites Icon" />
                </router-link> -->
            </div>
        </div>
    </nav>
</template>

<script>
import { EventBus } from '@/Utils/eventBus';
import { getData } from '@/Utils/LocalStorage';
export default {
    name: 'AppNavbar',
    data() {
        return {
            cartItems: [],
            userData: null,
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

        const stored = getData('userData');
        if (stored) {
            this.userData = stored;
            // Optionally re-emit to re-sync all components
            EventBus.$emit('user-updated', stored);
        }

        // ✅ Watch for changes through EventBus
        EventBus.$on('user-updated', (data) => {
            this.userData = data;
        });
    },

    beforeDestroy() {
        EventBus.$off('user-updated');
    },
    methods: {
        navigateToCart() {
            const userData = getData('userData');
            if (userData) {
                if (this.$route.name !== 'Cart') {
                    this.$router.push({
                        name: 'Cart',
                    });
                }
            } else {
                if (this.$route.name !== 'Login') {
                    this.$router.push({
                        name: 'Login',
                    });
                }
            }
        },
        handleUserNav() {
            const userData = getData('userData');
            if (userData) {
                if (this.$route.name !== 'AccountInfo') {
                    this.$router.push({
                        name: 'account',
                    });
                }
            } else {
                if (this.$route.name !== 'Login') {
                    this.$router.push({
                        name: 'Login',
                    });
                }
            }
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
    padding: 0px 40px;
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
    text-decoration: none;
    color: black;
    font-size: 14px;

    color: var(--text-color);
}

.cart-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}

.cart-link:hover:not(.no-bg),
.cart-link.router-link-exact-active:not(.no-bg) {
    background-color: white;
}

.router-link-exact-active:not(.no-bg) {
    background-color: #007bff;
    color: white;
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
</style>
