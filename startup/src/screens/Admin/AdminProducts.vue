<template>
    <div class="admin-products">
        <div
            class="products-header d-flex justify-content-between align-items-center mb-3">
            <h2>Products</h2>
            <b-form-group label="Select Category">
                <b-form-select
                    v-model="selectedCategory"
                    :options="computedCategories"
                    class="form-select"
                    value-field="CategoryId"
                    text-field="CategoryName"
                    placeholder="Категори сонгох" />
            </b-form-group>
            <b-button variant="primary" @click="openCreateModal"
                >+ Add Product</b-button
            >
        </div>

        <!-- Products Table -->
        <b-table
            striped
            hover
            :items="filteredProducts"
            :fields="fields"
            @row-clicked="openEditModal">
            <!-- Show image -->
            <template #cell(ImagePath)="data">
                <img
                    :src="data.item.ImageUrl"
                    alt="Product Image"
                    style="height: 50px; border-radius: 4px" />
            </template>
            <template #cell(description)="data">
                <div
                    class="quill-content text-wrap w-100"
                    v-html="data.item.description"></div>
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
            hide-footer
            @hide="resetModal">
            <b-form @submit.prevent="saveProduct">
                <b-form-group label="Product Name">
                    <b-form-input v-model="form.ProductName" required />
                </b-form-group>

                <b-form-group label="Price">
                    <b-form-input
                        v-model.number="form.Price"
                        type="number"
                        step="0.01"
                        required />
                </b-form-group>

                <b-form-group label="Quantity">
                    <b-form-input
                        v-model.number="form.quantity"
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

                <b-form-group label="Description">
                    <quill-editor
                        class="mt-3 mb-3"
                        v-model="form.description"
                        :options="editorOptions"></quill-editor>
                </b-form-group>

                <b-form-group label="Product Image">
                    <div class="d-flex align-items-center flex-column gap-4">
                        <div class="d-flex flex-column">
                            <img
                                v-if="imagePreview"
                                :src="imagePreview"
                                alt="Preview"
                                style="
                                    height: 150px;
                                    object-fit: cover;
                                    border-radius: 4px;
                                " />

                            <img
                                v-else
                                :src="form.ImageUrl"
                                alt="Product Image"
                                style="
                                    height: 150px;
                                    border-radius: 4px;
                                    object-fit: cover;
                                " />
                        </div>
                        <b-form-file
                            @change="handleImageUpload"
                            accept="image/*"
                            browse-text="Choose Image"
                            :state="!!form.ImageFile"
                            plain />
                    </div>
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
                { key: 'quantity', label: 'Quantity' },
                { key: 'description', label: 'Description' },
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
                quantity: 0,
                description: '',
                ImageFile: null, // For sending to server
            },

            imagePreview: null, // ✅ preview image blob
            showModal: false,
            isEditing: false,
            selectedCategory: 0,
            editorOptions: {
                // modules: {
                //   toolbar: [
                //     [{ header: [1, 2, false] }],
                //     ['bold', 'italic', 'underline'],
                //     ['image', 'code-block'],
                //   ],
                // },
                placeholder: 'Даалгаврын агуулга',
                theme: 'snow', // or 'bubble'
            },
        };
    },
    async mounted() {
        const res = await api.getProducts(1);
        const cats = await api.getCategories(1);
        const branches = await api.getBranches();
        this.products = res;
        this.categories = cats;
        this.branches = branches;
        console.log('P in ADMIN', res);

        console.log('branch in ADMIN', branches);
        console.log('cats in ADMIN', cats);
    },
    methods: {
        resetModal() {
            this.imagePreview = null;
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.imagePreview = URL.createObjectURL(file); // ✅ Instant preview
                this.form.ImageFile = file; // ✅ Store file for later upload
            }
        },
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
        async saveProduct() {
            if (this.isEditing) {
                // const index = this.products.findIndex(
                //     (p) => p.id === this.form.id
                // );
                // if (index !== -1)
                //     this.products.splice(index, 1, { ...this.form });
                console.log(this.form.ProductName, this.form.Price);
                console.log(this.form.BranchId, this.form.BranchName);
                console.log(this.form.CategoryId, this.form.CategoryName);
                const formData = new FormData();
                formData.append('ProductName', this.form.ProductName);
                formData.append('Price', this.form.Price);
                formData.append('CategoryId', this.form.CategoryId);
                formData.append('BranchId', this.form.BranchId);
                formData.append('quantity', this.form.quantity);
                formData.append('Type', 1);
                formData.append('description', this.form.description);
                if (this.form.ImageFile) {
                    formData.append(
                        'ImagePath',
                        this.form.ImageFile.name || ''
                    );
                    formData.append('ImageFile', this.form.ImageFile); // new image (if selected)
                }

                await api.updateProduct(this.form.ProductId, formData);
            } else {
                console.log('editing 2');
                console.log(this.form.ProductName, this.form.Price);
                console.log(this.form.BranchId, this.form.BranchName);
                console.log(this.form.CategoryId, this.form.CategoryName);
                console.log(this.form.ImageFile.name);
                const formData = new FormData();
                formData.append('ProductName', this.form.ProductName);
                formData.append('Price', this.form.Price);
                formData.append('CategoryId', this.form.CategoryId);
                formData.append('BranchId', this.form.BranchId);
                formData.append('quantity', this.form.quantity);
                formData.append('Type', 1);
                formData.append('description', this.form.description);
                formData.append('ImageFile', this.form.ImageFile); // 🔥 match .single('ImageFile')

                await api.createProduct(formData);
            }
            this.showModal = false;

            const res = await api.getProducts(1);
            this.products = res;
        },
        async deleteProduct(product) {
            console.log(product.ProductId);
            await api.deleteProduct(product.ProductId);

            const res = await api.getProducts(1);
            this.products = res;
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
    computed: {
        computedCategories() {
            return [
                { CategoryId: 0, CategoryName: 'All Categories' },
                ...this.categories,
            ];
        },

        filteredProducts() {
            if (this.selectedCategory === 0) {
                return this.products;
            }
            return this.products.filter(
                (p) => p.CategoryId === this.selectedCategory
            );
        },
    },
};
</script>

<style scoped>
.admin-products {
    padding: 20px;
}
</style>
