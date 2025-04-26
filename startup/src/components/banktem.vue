<template>
    <div
        class="bank-item"
        :class="{ selected: isSelected }"
        @click="$emit('select', bankId)">
        <div class="bank-left">
            <img :src="image" alt="Bank Icon" class="bank-icon" />
            <div class="bank-info">
                <h5 class="bank-title">{{ title }}</h5>
                <p class="bank-desc">{{ description }}</p>
            </div>
        </div>
        <div class="bank-arrow">›</div>
    </div>
</template>

<script>
export default {
    props: {
        bankId: {
            type: [String, Number],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            required: true,
        },
        selectedId: {
            type: [String, Number],
            default: null,
        },
    },
    computed: {
        isSelected() {
            return this.selectedId === this.bankId;
        },
    },
};
</script>

<style scoped>
.bank-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #eee;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: pointer;
    margin-bottom: 12px;
}

/* ✅ Hover shadow effect */
.bank-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.bank-item.selected {
    border: 1px solid #007bff;
    background-color: #f0f8ff;
}

.bank-left {
    display: flex;
    align-items: center;
}

.bank-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: contain;
    margin-right: 12px;
}

.bank-info {
    display: flex;
    flex-direction: column;
}

.bank-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.bank-desc {
    margin: 0;
    font-size: 13px;
    color: #888;
}

.bank-arrow {
    font-size: 20px;
    color: #bbb;
}
</style>
