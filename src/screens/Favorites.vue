<template>
    <div class="favorites-page">
        <h2 class="page-title">❤️ Favorites</h2>

        <div v-if="favorites.length === 0" class="empty-message">
            No favorite products yet.
        </div>

        <div class="favorites-grid">
            <BottleItem
                v-for="product in favorites"
                :key="product.ProductId"
                :product="product"
                @add-cart="addToCart"
                @add-favorite="removeFromFavorites" />
        </div>
    </div>
</template>

<script>
import BottleItem from '@/components/bottleItem.vue';
import api from '@/services/api';

export default {
    name: 'FavoritesPage',
    components: { BottleItem },
    data() {
        return {
            favorites: [],
        };
    },
    async mounted() {
        await this.loadFavorites();
    },
    methods: {
        async loadFavorites() {
            const favoriteIds = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            const allProducts = await api.getProducts();
            this.favorites = allProducts.filter((p) =>
                favoriteIds.includes(p.ProductId)
            );
            console.log('laod Favs', this.favorites);
        },
        async removeFromFavorites(product) {
            const favoriteIds = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            console.log('removin', favoriteIds);
            const updated = favoriteIds.filter(
                (id) => id !== product.ProductId
            );
            localStorage.setItem('favorites', JSON.stringify(updated));
            await this.loadFavorites(); // reload list
        },
        addToCart(product) {
            console.log('Add to cart:', product);
            // implement your cart logic here
        },
    },
};
</script>

<style scoped>
.favorites-page {
    padding: 20px;
}

.page-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
}

.empty-message {
    font-size: 16px;
    color: #888;
}
.favorites-grid {
    margin: 0px 20px 20px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
</style>
