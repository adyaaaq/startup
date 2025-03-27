import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/screens/Home.vue';
import Cart from '@/screens/Cart.vue';
import Login from '@/screens/Login/Login.vue';
import Products from '@/screens/Products.vue';
import Flowers from '@/screens/Flowers.vue';
import Favorites from '@/screens/Favorites.vue';

import Users from '@/screens/Admin/Users/Users.vue';
import Dashboard from '@/screens/Admin/Dashboard/Dashboard.vue';
import AdminProducts from '@/screens/Admin/AdminProducts.vue';

import AdminLayout from '@/screens/Layout/AdminLayout.vue';

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
            path: '/cart',
            name: 'Cart',
            component: Cart,
            meta: { breadcrumb: 'Сагс' },
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
            ],
        },
    ],
});
