<template>
    <button
        class="locItem-container gap-2"
        @click="selectItem"
        :class="{ selected: selected === location.id }">
        <div class="d-flex flex-row gap-2">
            <input
                type="radio"
                :id="`location-${location.id}`"
                :value="location.id"
                :checked="selected === location.id"
                @change="selectItem" />
            <div class="d-flex flex-column">
                <label for="option1" class="locTitle">{{
                    this.location.Title
                }}</label>
                <p style="text-align: start">
                    {{ this.location.Hot }}, {{ this.location.Duureg }},
                    {{ this.location.Horoo }}
                </p>
            </div>
        </div>
        <div class="d-flex flex-row gap-2 align-items-center">
            <button class="icon-button" @click="showEditModal">
                <img
                    :src="require('@/assets/svgicons/edit.svg')"
                    class="lil-icon"
                    alt="Edit icon" />
            </button>
            <button class="icon-button" @click="showRemoveModal">
                <img
                    :src="require('@/assets/svgicons/trash-black.svg')"
                    class="lil-icon"
                    alt="Trash icon" />
            </button>
        </div>
        <b-modal
            v-model="editModalVisible"
            title="Хүргэлтийн хаяг засах"
            hide-footer
            centered>
            <div class="modal-body">
                <p>Do you want to edit this location?</p>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-3">
                <button
                    class="modal-btn cancel"
                    @click="editModalVisible = false">
                    Cancel
                </button>
                <button class="modal-btn confirm" @click="confirmEdit">
                    Confirm
                </button>
            </div>
        </b-modal>
        <b-modal
            v-model="removeModalVisible"
            title="Хүргэлтийн хаяг устгах"
            hide-footer
            centered>
            <div class="modal-body">
                <div class="d-flex flex-row align-items-center">
                    <h6 class="mb-0">{{ this.location.Title }}</h6>
                    <p>
                        - {{ this.location.Hot }}, {{ this.location.Duureg }},
                        {{ this.location.Horoo }}
                    </p>
                </div>
                <p>{{ this.location.detail }}</p>
                <p>Та хүргэлтийн хаягийг устгахдаа итгэлтэй байна уу?</p>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-3">
                <button
                    class="modal-btn cancel"
                    @click="removeModalVisible = false">
                    Cancel
                </button>
                <button class="modal-btn confirm" @click="confirmRemove">
                    Remove
                </button>
            </div>
        </b-modal>
    </button>

    <!-- Edit Confirmation Modal -->
</template>

<script>
export default {
    name: 'LocItem',
    props: {
        location: Object,
        selected: Number,
        edit: Function,
    },

    data() {
        return {
            selectedOption: null,
            editModalVisible: false,
            removeModalVisible: false,
        };
    },
    mounted() {
        console.log('loc here: ', this.location);
    },
    methods: {
        selectItem() {
            if (this.selected !== this.location.id) {
                this.$emit('select', this.location.id);
            }
        },
        showEditModal() {
            this.$emit('edit', this.location); // ✅ Emit to parent
            // this.editModalVisible = true;
        },
        showRemoveModal() {
            this.removeModalVisible = true;
        },
        confirmEdit() {
            console.log('Location edited!');
            this.editModalVisible = false;
        },
        confirmRemove() {
            console.log('Location removed!');
            this.removeModalVisible = false;
        },
    },
};
</script>

<style scoped>
.locItem-container.selected {
    border: 2px solid #6c63ff;
    background-color: #f5f5ff;
}
.locItem-container {
    min-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    justify-content: space-between;
    background-color: #eeeeee;
    border-radius: 12px;
    padding: 12px;
    flex: 1;
    border: 0px;
}

.locTitle {
    font-weight: 600;
    font-size: 14px;
    text-overflow: ellipsis;
    text-align: start;
}

.lil-icon {
    background-color: white;
    padding: 4px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
}

/* Modal Buttons */
.modal-btn {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
}

.modal-btn.cancel {
    background-color: gray;
    color: white;
}

.modal-btn.confirm {
    background-color: #6c63ff;
    color: white;
}

/deep/ .modal-header {
    justify-content: space-between !important;
}

.add-icon-container {
    display: flex;
    height: 16px;
    width: 16px;
    justify-content: center;
    align-items: center;
    border: 1px black solid;
    border-radius: 100px;
    margin-bottom: 10px;
}

.add-icon {
    height: 8px;
    width: 8px;
}
</style>
