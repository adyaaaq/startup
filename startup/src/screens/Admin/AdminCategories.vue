<template>
    <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>Categories</h4>
            <b-button variant="primary" @click="openCreateModal"
                >+ Add Category</b-button
            >
        </div>

        <!-- Filter -->
        <b-form-group label="Filter by Type" class="mb-4">
            <b-form-select
                v-model="selectedType"
                :options="typeOptions"
                @change="fetchCategories"
                class="w-25 form-select" />
        </b-form-group>

        <!-- Category Groups -->
        <div
            v-for="(group, typeKey) in groupedCategories"
            :key="typeKey"
            class="mb-4">
            <h5 class="text-muted">{{ typeKey }}</h5>
            <b-list-group>
                <b-list-group-item
                    v-for="category in group"
                    :key="category.CategoryId"
                    class="d-flex justify-content-between align-items-center">
                    {{ category.CategoryName }}
                    <b-button
                        size="sm"
                        variant="outline-secondary"
                        @click="openEditModal(category)">
                        Edit
                    </b-button>
                </b-list-group-item>
            </b-list-group>
        </div>

        <!-- Modal -->
        <CategoryModal
            :showModal="showModal"
            :categoryData="selectedCategory"
            :type="selectedType || null"
            @close="showModal = false"
            @success="onModalSuccess" />
    </div>
</template>

<script>
import api from '@/services/api';
import CategoryModal from './components/CategoryModal.vue';

export default {
    components: { CategoryModal },
    data() {
        return {
            allCategories: [],
            selectedType: null,
            showModal: false,
            selectedCategory: null,
            typeOptions: [
                { value: null, text: 'All Types' },
                { value: 1, text: 'Liqours' },
                { value: 2, text: 'Flowers' },
                { value: 3, text: 'Sets' },
            ],
        };
    },
    computed: {
        groupedCategories() {
            const grouped = {};

            this.filteredCategories.forEach((cat) => {
                const typeEntry = this.typeOptions.find(
                    (opt) => opt.value === cat.Type
                );
                const key = typeEntry ? typeEntry.text : 'Unknown';

                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(cat);
            });

            return grouped;
        },
        filteredCategories() {
            if (this.selectedType === null) return this.allCategories;
            return this.allCategories.filter(
                (c) => c.Type === this.selectedType
            );
        },
    },
    methods: {
        async fetchCategories() {
            const res = await api.getCategories(this.selectedType);
            this.allCategories = res;
        },
        openCreateModal() {
            this.selectedCategory = null;
            this.showModal = true;
        },
        openEditModal(category) {
            this.selectedCategory = category;
            this.showModal = true;
        },
        onModalSuccess() {
            this.showModal = false;
            this.fetchCategories();
        },
    },
    mounted() {
        this.fetchCategories();
    },
};
</script>
