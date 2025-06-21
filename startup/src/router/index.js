import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/screens/Home.vue';
import Cart from '@/screens/Cart.vue';
import Login from '@/screens/Login/Login.vue';
import Products from '@/screens/Products.vue';
import Flowers from '@/screens/Flowers.vue';
import Favorites from '@/screens/Favorites.vue';
import Sets from '@/screens/Sets.vue';
import ProductDetail from '@/screens/ProductDetail.vue';
import Confirmation from '@/screens/Confirmation.vue';

import AccountLayout from '@/screens/Account/AccountLayout.vue';
import Info from '@/screens/Account/Info.vue';
import Orders from '@/screens/Account/Orders.vue';

import Users from '@/screens/Admin/Users/Users.vue';
import Dashboard from '@/screens/Admin/Dashboard/Dashboard.vue';
import AdminProducts from '@/screens/Admin/AdminProducts.vue';
import AdminFlowers from '@/screens/Admin/AdminFlowers.vue';
import AdminSets from '@/screens/Admin/AdminSets.vue';
import AdminLayout from '@/screens/Layout/AdminLayout.vue';
import AdminCategories from '@/screens/Admin/AdminCategories.vue';
import AdminBanner from '@/screens/Admin/AdminBanner.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home', // root redirect only
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: { breadcrumb: 'Нүүр хуудас' },
        },

        {
            path: '/account',
            component: AccountLayout,
            children: [
                {
                    path: 'info',
                    name: 'AccountInfo',
                    component: Info,
                },
                {
                    path: 'orders',
                    name: 'AccountOrders',
                    component: Orders,
                },
            ],
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
            meta: { breadcrumb: 'Сагс' },
        },
        {
            path: '/Confirmation',
            name: 'Confirmation',
            component: Confirmation,
            meta: { breadcrumb: 'Confirmation' },
            props: true,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { breadcrumb: 'Login' },
        },
        {
            path: '/products',
            name: 'Products',
            component: Products,
            meta: { breadcrumb: 'Products' },
        },
        {
            path: '/flowers',
            name: 'Flowers',
            component: Flowers,
            meta: { breadcrumb: 'Flowers' },
        },
        {
            path: '/Favorites',
            name: 'Favorites',
            component: Favorites,
            meta: { breadcrumb: 'Favorites' },
        },
        {
            path: '/Sets',
            name: 'Sets',
            component: Sets,
            meta: { breadcrumb: 'Sets' },
        },
        {
            path: '/ProductDetail',
            name: 'ProductDetail',
            component: ProductDetail,
            meta: { breadcrumb: 'ProductDetail' },
        },

        {
            path: '/admin',
            component: AdminLayout,
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: Dashboard,
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: Users,
                },
                {
                    path: 'Products',
                    name: 'Products',
                    component: AdminProducts,
                },
                {
                    path: 'Flowers',
                    name: 'Flowers',
                    component: AdminFlowers,
                },
                {
                    path: 'Sets',
                    name: 'Sets',
                    component: AdminSets,
                },
                {
                    path: 'Categories',
                    name: 'Categories',
                    component: AdminCategories,
                },
                {
                    path: 'Banners',
                    name: 'Banners',
                    component: AdminBanner,
                },
            ],
        },
    ],
});
