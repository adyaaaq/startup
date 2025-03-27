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
                    <b-form-input v-model="form.name" required />
                </b-form-group>

                <b-form-group label="Price">
                    <b-form-input
                        v-model.number="form.price"
                        type="number"
                        required />
                </b-form-group>

                <b-form-group label="Category">
                    <b-form-input v-model="form.category" required />
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
export default {
    name: 'AdminProducts',
    data() {
        return {
            products: [
                { id: 1, name: 'Whiskey', price: 125, category: 'Spirits' },
                { id: 2, name: 'Chardonnay', price: 80, category: 'Wine' },
            ],
            fields: [
                { key: 'id', label: '#' },
                { key: 'name', label: 'Name' },
                { key: 'price', label: 'Price' },
                { key: 'category', label: 'Category' },
                { key: 'actions', label: 'Actions' },
            ],
            showModal: false,
            isEditing: false,
            form: {
                id: null,
                name: '',
                price: null,
                category: '',
            },
        };
    },
    methods: {
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
