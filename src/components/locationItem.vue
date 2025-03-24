<template>
    <button class="locItem-container gap-2">
        <div class="d-flex flex-row gap-2">
            <input
                type="radio"
                id="option1"
                value="option1"
                v-model="selectedOption" />
            <div class="d-flex flex-column">
                <label for="option1" class="locTitle">Option 1</label>
                <p>бөйыбөь, өбйыөйыө ,й өбйы өйыөйы</p>
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
    </button>

    <!-- Edit Confirmation Modal -->
</template>

<script>
export default {
    name: 'LocItem',
    data() {
        return {
            selectedOption: null,
            editModalVisible: false,
            removeModalVisible: false,
        };
    },
    methods: {
        showEditModal() {
            this.$refs['choose-stud-modal'].show();
            console.log('Editing item...');
            this.editModalVisible = true;
        },
        showRemoveModal() {
            this.removeModalVisible = true;
        },
        edit() {
            this.$refs['choose-stud-modal'].show();
            console.log('Editing item...');
        },
        remove() {
            console.log('Removing item...');
            this.removeModalVisible = false;
        },
    },
};
</script>

<style scoped>
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
