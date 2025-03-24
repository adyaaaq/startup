import Vue from 'vue';

import Router from 'vue-router';
import Home from '@/screens/Home.vue';
import Cart from '@/screens/Cart.vue';
import Login from '@/screens/Login/Login.vue';
import Products from '@/screens/Products.vue';
import Flowers from '@/screens/Flowers.vue';
Vue.use(Router);

export default new Router({
    mode: 'history', // Enables clean URLs
    routes: [
        // side menus
        {
            path: '/',
            redirect: '/home', // Redirect root path to Home
        },

        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                breadcrumb: 'Нүүр хуудас',
            },
            //beforeEnter: ifAuthenticated
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
            meta: {
                breadcrumb: 'Сагс',
            },
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
            meta: {
                breadcrumb: 'Login',
            },
        },
        {
            path: '/Products',
            name: 'Products',
            component: Products,
            meta: {
                breadcrumb: 'Products',
            },
        },
        {
            path: '/Flowers',
            name: 'Flowers',
            component: Flowers,
            meta: {
                breadcrumb: 'Flowers',
            },
        },
    ],
});
