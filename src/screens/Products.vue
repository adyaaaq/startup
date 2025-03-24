<template>
    <div class="products-page">
        <!-- Sidebar -->
        <aside class="sidebar">
            <h3 class="sidebar-title">АНГИЛАЛУУД</h3>
            <ul class="category-list">
                <li v-for="(category, index) in categories" :key="index">
                    <a
                        style="font-family: var(--text-font)"
                        href="#"
                        @click.prevent
                        >{{ category.name }}</a
                    >
                </li>
            </ul>

            <!-- Price Filter -->
            <h3 class="sidebar-title">Үнэ шүүлтүүр</h3>
            <div class="price-filter">
                <input
                    type="number"
                    v-model.number="priceMin"
                    :min="minPrice"
                    :max="maxPrice"
                    placeholder="Мин ₮"
                    class="form-control" />
                <span>-</span>
                <input
                    type="number"
                    v-model.number="priceMax"
                    :min="minPrice"
                    :max="maxPrice"
                    placeholder="Макс ₮"
                    class="form-control" />
            </div>

            <!-- Sorting Options -->
            <h3 class="sidebar-title">ЭРЭМБЭЛЭХ</h3>
            <select class="form-control" v-model="sortOption">
                <option value="name-asc">A-Я</option>
                <option value="name-desc">Я-A</option>
                <option value="price-asc">Үнэ өсөхөөр</option>
                <option value="price-desc">Үнэ буурахаар</option>
            </select>
        </aside>

        <!-- Product Grid -->
        <main class="product-grid">
            <h2 class="product-header">
                <strong>Бренд</strong> •
                {{ sortedProducts.length }} Бүтээгдэхүүн
            </h2>

            <div class="products-container">
                <bottleItem
                    v-for="(product, index) in sortedProducts"
                    :key="index"
                    :product="product" />
            </div>
        </main>
    </div>
</template>

<script>
import bottleItem from '@/components/bottleItem.vue';
export default {
    name: 'ProductsPage',
    components: { bottleItem },
    data() {
        return {
            categories: [
                { name: 'Бэлгийн Багц' },
                { name: 'Sale' },
                { name: 'Шар Айраг' },
                { name: 'Бренд' },
                { name: 'Шампейн' },
                { name: 'Коньяк' },
                { name: 'Жин' },
                { name: 'Ликёр' },
                { name: 'Мезкал' },
                { name: 'Хатуулагтай Ундаа' },
                { name: 'Ром' },
                { name: 'Текила' },
                { name: 'Виски' },
                { name: 'Дарс' },
                { name: 'Хатуулаггүй Бүтээгдэхүүн' },
            ],
            products: [
                {
                    name: 'Vecchia Romagna 1820 classica 70cl',
                    price: 95000,
                    image: require('@/assets/images/wine.png'),
                },
                {
                    name: 'Vecchia Romagna 1820 etichetta nera 70cl',
                    price: 117000,
                    image: require('@/assets/images/wine.png'),
                },
                {
                    name: 'Vecchia Romagna 1820 riserva tre botti 70cl',
                    price: 210000,
                    image: require('@/assets/images/wine.png'),
                },
                {
                    name: 'Vecchia Romagna riserva 18YO 70cl',
                    price: 693000,
                    image: require('@/assets/images/wine.png'),
                },
                {
                    name: 'Vecchia Romagna riserva 18YO 70cl',
                    price: 693000,
                    image: require('@/assets/images/wine.png'),
                },
            ],
            priceMin: 0, // User-input min price
            priceMax: 1000000, // User-input max price
            sortOption: 'name-asc', // Default sorting option
        };
    },
    computed: {
        minPrice() {
            return Math.min(...this.products.map((p) => p.price));
        },
        maxPrice() {
            return Math.max(...this.products.map((p) => p.price));
        },
        filteredProducts() {
            return this.products.filter(
                (product) =>
                    product.price >= this.priceMin &&
                    product.price <= this.priceMax
            );
        },
        sortedProducts() {
            let sorted = [...this.filteredProducts];

            if (this.sortOption === 'name-asc') {
                sorted.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortOption === 'name-desc') {
                sorted.sort((a, b) => b.name.localeCompare(a.name));
            } else if (this.sortOption === 'price-asc') {
                sorted.sort((a, b) => a.price - b.price);
            } else if (this.sortOption === 'price-desc') {
                sorted.sort((a, b) => b.price - a.price);
            }

            return sorted;
        },
    },
    watch: {
        // Ensure priceMin is not greater than priceMax
        priceMin(newMin) {
            if (newMin > this.priceMax) {
                this.priceMin = this.priceMax;
            }
        },
        priceMax(newMax) {
            if (newMax < this.priceMin) {
                this.priceMax = this.priceMin;
            }
        },
    },
};
</script>

<style scoped>
/* Layout */
.products-page {
    display: flex;
    gap: 20px;
    padding: 20px;
}

/* Sidebar */
.sidebar {
    width: 250px;
    background: #f8f8f8;
    padding: 20px;
    border-radius: 10px;
}

/* Category List */
.sidebar-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

.category-list {
    list-style: none;
    padding: 0;
}

.category-list li {
    margin-bottom: 8px;
}

.category-list a {
    text-decoration: none;
    color: black;
    font-size: 14px;
}

/* Price Filter */
.price-filter {
    display: flex;
    align-items: center;
    gap: 10px;
}

.price-input {
    width: 80px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
}

/* Sorting Dropdown */
.sort-dropdown {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
}

/* Product Grid */
.product-grid {
    flex: 1;
}

.product-header {
    font-size: 18px;
    margin-bottom: 15px;
}

/* Products */
.products-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
</style>
