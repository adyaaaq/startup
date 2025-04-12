<template>
    <div class="admin-products">
        <div
            class="products-header d-flex justify-content-between align-items-center mb-3">
            <h2>Products</h2>
            <b-button variant="primary" @click="openCreateModal"
                >+ Add Product</b-button
            >
        </div>

        <!-- Products Table -->
        <b-table
            striped
            hover
            :items="products"
            :fields="fields"
            @row-clicked="openEditModal">
            <!-- Show image -->
            <template #cell(ImagePath)="data">
                <img
                    :src="getImageUrl(data.item.ImagePath)"
                    alt="Product Image"
                    style="height: 50px; border-radius: 4px" />
            </template>

            <!-- Action buttons -->
            <template #cell(actions)="row">
                <b-button
                    size="sm"
                    variant="warning"
                    @click.stop="openEditModal(row.item)"
                    >Edit</b-button
                >
                <b-button
                    size="sm"
                    variant="danger"
                    @click.stop="deleteProduct(row.item)"
                    >Delete</b-button
                >
            </template>
        </b-table>

        <!-- Add/Edit Modal -->
        <b-modal
            v-model="showModal"
            :title="isEditing ? 'Edit Product' : 'Add Product'"
            hide-footer>
            <b-form @submit.prevent="saveProduct">
                <b-form-group label="Product Name">
                    <b-form-input v-model="form.ProductName" required />
                </b-form-group>

                <b-form-group label="Price">
                    <b-form-input
                        v-model.number="form.Price"
                        type="number"
                        required />
                </b-form-group>

                <b-form-group label="Category">
                    <b-form-select
                        v-model="form.CategoryId"
                        :options="categories"
                        required
                        text-field="CategoryName"
                        value-field="CategoryId"
                        placeholder="Категори сонгох"
                        class="form-select" />
                </b-form-group>

                <b-form-group label="Branch">
                    <b-form-select
                        v-model="form.BranchId"
                        :options="branches"
                        required
                        text-field="BranchName"
                        value-field="BranchId"
                        placeholder="Салбар сонгох"
                        class="form-select" />
                </b-form-group>

                <b-form-group label="Branch ID">
                    <b-form-input
                        v-model="form.BranchId"
                        type="number"
                        required />
                </b-form-group>

                <b-form-group label="Image Path">
                    <b-form-input v-model="form.ImagePath" />
                </b-form-group>

                <div class="d-flex justify-content-end mt-3">
                    <b-button variant="secondary" @click="showModal = false"
                        >Cancel</b-button
                    >
                    <b-button variant="primary" type="submit" class="ml-2">{{
                        isEditing ? 'Update' : 'Create'
                    }}</b-button>
                </div>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    name: 'AdminProducts',
    data() {
        return {
            products: [],
            categories: [],
            branches: [],
            fields: [
                { key: 'ProductId', label: '#' },
                { key: 'ProductName', label: 'Name' },
                { key: 'Price', label: 'Price' },
                { key: 'CategoryName', label: 'CategoryName' },
                { key: 'BranchName', label: 'Branch' },
                { key: 'ImagePath', label: 'Image' }, // 👈 added this
                { key: 'actions', label: 'Actions' },
            ],
            form: {
                ProductId: null,
                ProductName: '',
                Price: null,
                CategoryId: null,
                BranchId: null,
                ImagePath: '',
            },

            showModal: false,
            isEditing: false,
        };
    },
    async mounted() {
        const res = await api.getProducts();
        const cats = await api.getCategories();
        const branches = await api.getBranches();
        this.products = res;
        this.categories = cats;
        this.branches = branches;
        console.log('P in ADMIN', res);

        console.log('branch in ADMIN', branches);
        console.log('cats in ADMIN', cats);
    },
    methods: {
        getImageUrl(path) {
            try {
                // Dynamically require the asset if it starts with @
                if (path.startsWith('@/')) {
                    return require(`@/${path.replace('@/', '')}`);
                }
                return path; // fallback for full URLs
            } catch (e) {
                return ''; // fallback if image not found
            }
        },
        openCreateModal() {
            this.resetForm();
            this.isEditing = false;
            this.showModal = true;
        },
        openEditModal(product) {
            this.form = { ...product };
            this.isEditing = true;
            this.showModal = true;
        },
        saveProduct() {
            if (this.isEditing) {
                const index = this.products.findIndex(
                    (p) => p.id === this.form.id
                );
                if (index !== -1)
                    this.products.splice(index, 1, { ...this.form });
            } else {
                this.form.id = Date.now();
                this.products.push({ ...this.form });
            }
            this.showModal = false;
        },
        deleteProduct(product) {
            this.products = this.products.filter((p) => p.id !== product.id);
        },
        resetForm() {
            this.form = {
                id: null,
                name: '',
                price: null,
                category: '',
            };
        },
    },
};
</script>

<style scoped>
.admin-products {
    padding: 20px;
}
</style>
