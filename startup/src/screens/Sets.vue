<template>
    <div class="products-page">
        <!-- Sidebar -->
        <aside class="sidebar">
            <h3 class="sidebar-title">АНГИЛАЛУУД</h3>
            <ul class="category-list">
                <li
                    v-for="(category, index) in computedCategories"
                    :key="index"
                    :class="{
                        selected: selectedCategoryId === category.CategoryId,
                    }"
                    @click="selectCategory(category.CategoryId)">
                    <a
                        href="#"
                        @click.prevent
                        style="font-family: var(--text-font)">
                        {{ category.CategoryName }}
                    </a>
                </li>
            </ul>

            <!-- Price Filter -->
            <h3 class="sidebar-title">Үнэ шүүлтүүр</h3>
            <div class="price-filter">
                <input
                    style="font-family: var(--text-font)"
                    type="number"
                    v-model.number="priceMin"
                    :min="minPrice"
                    :max="maxPrice"
                    placeholder="Мин ₮"
                    class="form-control" />
                <span>-</span>
                <input
                    style="font-family: var(--text-font)"
                    type="number"
                    v-model.number="priceMax"
                    :min="minPrice"
                    :max="maxPrice"
                    placeholder="Макс ₮"
                    class="form-control" />
                ₮
            </div>

            <!-- Sorting Options -->
            <h3 class="sidebar-title mt-3">ЭРЭМБЭЛЭХ</h3>
            <select
                class="form-select"
                v-model="sortOption"
                style="font-family: var(--text-font)">
                <option value="name-asc">A-Я</option>
                <option value="name-desc">Я-A</option>
                <option value="price-asc">Үнэ өсөхөөр</option>
                <option value="price-desc">Үнэ буурахаар</option>
            </select>
            <button
                style="font-family: var(--text-font)"
                class="btn btn-outline-secondary w-100 mt-4"
                @click="clearFilters">
                цэвэрлэх
            </button>
        </aside>

        <!-- Product Grid -->
        <main class="product-grid">
            <h2 class="product-header">
                <strong>Багцууд</strong> • {{ sortedProducts.length }} Багц
            </h2>

            <div class="products-container">
                <bottleItem
                    v-for="product in sortedProducts"
                    :key="product.ProductId"
                    :product="product"
                    @add-favorite="handleFavorite"
                    @add-cart="handleCart" />
            </div>
        </main>
    </div>
</template>

<script>
import bottleItem from '@/components/bottleItem.vue';
import api from '@/services/api';
export default {
    name: 'SetsPage',
    components: { bottleItem },
    data() {
        return {
            categories: [],
            products: [],
            priceMin: 0, // User-input min price
            priceMax: 1000000, // User-input max price
            sortOption: 'name-asc', // Default sorting option
            selectedCategoryId: 0,
        };
    },
    methods: {
        clearFilters() {
            this.selectedCategoryId = 0;
            this.priceMin = 0;
            this.priceMax = 1000000;
            this.sortOption = 'name-asc';
        },
        handleFavorite(product) {
            let favorites = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );

            // prevent duplicates
            if (!favorites.includes(product.ProductId)) {
                favorites.push(product.ProductId);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        },
        handleCart(product) {
            console.log('CART:', product);
            // Add to cart logic here
        },

        selectCategory(id) {
            this.selectedCategoryId = id;
        },
    },
    async mounted() {
        const res = await api.getProducts(3);
        const cats = await api.getCategories(3);
        // console.log('we got products', res);
        this.products = res;
        this.categories = cats;
        console.log(this.categories);
    },
    computed: {
        minPrice() {
            return Math.min(...this.products.map((p) => p.Price));
        },
        maxPrice() {
            return Math.max(...this.products.map((p) => p.Price));
        },
        filteredProducts() {
            return this.products.filter((product) => {
                const priceMatch =
                    product.Price >= this.priceMin &&
                    product.Price <= this.priceMax;
                const categoryMatch =
                    this.selectedCategoryId === 0 ||
                    product.CategoryId === this.selectedCategoryId;
                return priceMatch && categoryMatch;
            });
        },
        sortedProducts() {
            let sorted = [...this.filteredProducts];

            if (this.sortOption === 'name-asc') {
                sorted.sort((a, b) =>
                    a.ProductName.localeCompare(b.ProductName)
                );
            } else if (this.sortOption === 'name-desc') {
                sorted.sort((a, b) =>
                    b.ProductName.localeCompare(a.ProductName)
                );
            } else if (this.sortOption === 'price-asc') {
                sorted.sort((a, b) => a.price - b.price);
            } else if (this.sortOption === 'price-desc') {
                sorted.sort((a, b) => b.price - a.price);
            }

            return sorted;
        },
        computedCategories() {
            return [
                { CategoryId: 0, CategoryName: 'Бүгд' },
                ...this.categories,
            ];
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

.category-list li {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 12px;
}

.category-list li:hover {
    background-color: #f0f0f0; /* light gray on hover */
}

.category-list li.selected {
    background-color: #f0f0f0; /* blue or your primary */
    color: white;
}
</style>
