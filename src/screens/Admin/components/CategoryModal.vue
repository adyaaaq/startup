<template>
    <b-modal
        v-model="show"
        :title="isEdit ? 'Edit Category' : 'Add Category'"
        hide-footer
        @hidden="resetForm">
        <b-form @submit.prevent="handleSubmit">
            <b-form-group label="Category Name">
                <b-form-input v-model="form.CategoryName" required />
            </b-form-group>
            <b-form-group :label="isEdit ? 'Type' : 'Type (select one)'">
                <b-form-select
                    class="form-select"
                    v-model.number="form.Type"
                    :options="typeOptions"
                    :placeholder="!isEdit ? 'Choose category type...' : null"
                    :disabled="isEdit"
                    required />
            </b-form-group>

            <div class="d-flex justify-content-between mt-3">
                <b-button variant="secondary" @click="show = false"
                    >Cancel</b-button
                >
                <div>
                    <b-button
                        v-if="isEdit"
                        variant="danger"
                        @click="handleDelete"
                        >Delete</b-button
                    >
                    <b-button variant="primary" type="submit" class="ml-2">
                        {{ isEdit ? 'Update' : 'Create' }}
                    </b-button>
                </div>
            </div>
        </b-form>
    </b-modal>
</template>

<script>
import api from '@/services/api';

export default {
    props: {
        showModal: Boolean,
        categoryData: Object,
        type: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            show: this.showModal,
            form: {
                CategoryName: '',
                Type: this.type ?? 1,
            },
            typeOptions: [
                { value: 1, text: 'Liqours' },
                { value: 2, text: 'Flowers' },
                { value: 3, text: 'Sets' },
            ],
        };
    },
    computed: {
        isEdit() {
            return !!this.categoryData?.CategoryId;
        },
    },
    watch: {
        showModal(val) {
            this.show = val;
        },
        show(val) {
            if (!val) this.$emit('close');
        },
        categoryData: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.form = {
                        CategoryName: val.CategoryName,
                        Type: val.Type,
                    };
                } else {
                    this.form = {
                        CategoryName: '',
                        Type: this.type ?? 1,
                    };
                }
            },
        },
    },
    methods: {
        async handleSubmit() {
            try {
                if (this.isEdit) {
                    await api.updateCategory(
                        this.categoryData.CategoryId,
                        this.form
                    );
                } else {
                    await api.createCategory(this.form);
                }
                this.$emit('success');
                this.show = false;
            } catch (err) {
                console.error(err);
            }
        },
        async handleDelete() {
            try {
                await api.deleteCategory(this.categoryData.CategoryId);
                this.$emit('success');
                this.show = false;
            } catch (err) {
                console.error(err);
            }
        },
        resetForm() {
            this.form = {
                CategoryName: '',
                Type: this.type ?? 1,
            };
        },
    },
};
</script>
