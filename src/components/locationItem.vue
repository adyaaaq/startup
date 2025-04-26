<template>
    <button
        class="locItem-container gap-2"
        @click="selectItem"
        :class="{ selected: selected === location.LocationId }">
        <div class="d-flex flex-row gap-2">
            <input
                type="radio"
                :id="`location-${location.id}`"
                :value="location.id"
                :checked="selected === location.LocationId"
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
        remove: Function,
    },

    data() {
        return {
            selectedOption: null,
            editModalVisible: false,
            removeModalVisible: false,
        };
    },
    mounted() {},
    methods: {
        selectItem() {
            if (this.selected !== this.location.LocationId) {
                this.$emit('select', this.location.LocationId);
            }
        },
        showEditModal() {
            this.$emit('edit', this.location); // ✅ Emit to parent
            // this.editModalVisible = true;
        },
        showRemoveModal() {
            this.$emit('remove', this.location); // ✅ Emit to parent
        },
        confirmEdit() {
            console.log('Location edited!');
            this.editModalVisible = false;
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
    background-color: white !important;
    border-radius: 12px;
    padding: 12px;
    flex: 1;
    border: 0px;
    transition: transform 0.2s, box-shadow 0.2s; /* ✅ add transition here */
}

.locItem-container.selected {
    border: 2px solid #007bff;
    background-color: #f0f8ff !important;
}

.locItem-container:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px); /* ✅ remove !important */
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
