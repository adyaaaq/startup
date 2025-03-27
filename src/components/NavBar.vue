<template>
    <nav class="navbar">
        <div class="nav-container">
            <router-link :to="{ name: 'Home' }" class="cart-link">
                <div class="logo">
                    <span class="black-text">Mimi Liqour</span
                    ><span class="orange-text">Shop</span>
                </div>
            </router-link>
            <!-- <div class="left-section">
                <button class="menu-btn">☰</button>
            </div> -->
            <!-- <div class="logo">
                <span class="black-text">Mimi Liqour</span
                ><span class="orange-text">Shop</span>
            </div> -->
            <div class="right-section">
                <router-link :to="{ name: 'Products' }" class="cart-link">
                    <span class="auth-link">Шингэн зүйлс </span>
                </router-link>
                <router-link :to="{ name: 'Flowers' }" class="cart-link">
                    <span class="auth-link">Цэцэг </span>
                </router-link>
                <router-link :to="{ name: 'Login' }" class="cart-link">
                    <span class="auth-link">Нэвтрэх</span>
                </router-link>
                <router-link :to="{ name: 'Favorites' }" class="cart-link">
                    <img
                        class="svgicon"
                        style="height: 16px; width: 16px"
                        src="@/assets/svgicons/love.svg"
                        alt="Cart Icon" />
                </router-link>
                <router-link :to="{ name: 'Cart' }" class="cart-link">
                    <div class="cart">
                        <img
                            class="svgicon"
                            src="@/assets/svgicons/cart.svg"
                            alt="Cart Icon" />
                        <span class="cart-total">40,235</span>
                        <span class="cart-notification"></span>
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'AppNavbar',
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
</style>
