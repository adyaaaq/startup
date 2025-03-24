<template>
    <div class="bottle-item">
        <div class="image-container">
            <img
                :src="require('@/assets/images/wine.png')"
                alt="Bottle Image"
                class="bottle-image" />
            <button
                class="add-button"
                @mouseover="hover = true"
                @mouseleave="hover = false">
                <img
                    :src="
                        hover
                            ? require('@/assets/svgicons/heart.svg')
                            : require('@/assets/svgicons/love.svg')
                    "
                    alt="Heart Icon"
                    class="addicon" />
            </button>
        </div>
        <div class="bottle-info">
            <p class="bottle-name">Buffalo Trace Bourbon Cream 750ml</p>
            <div
                class="d-flex flex-row justify-content-between align-items-center">
                <div class="price-section">
                    <span class="discounted-price">20'000₮</span>
                    <!-- <span class="original-price">$24.95</span> -->
                </div>

                <img
                    :src="require('@/assets/svgicons/cart.svg')"
                    alt="Bottle Image"
                    class="addicon"
                    style="margin-right: 8px" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BottleItem',
    data() {
        return {
            hover: false,
        };
    },
};
</script>

<style scoped>
/* Container */
.bottle-item {
    flex: 1 1 250px; /* flex-grow: 1, flex-shrink: 1, flex-basis: 250px */
    min-width: 250px;
    /* max-width: 300px; */
    text-align: start;
}

/* Image Section */
.image-container {
    position: relative;
    background: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    border-radius: 10px;
}

.image-container:hover .bottle-image {
    transform: scale(1.1); /* Increases size */
    transition: transform 0.3s ease-in-out; /* Smooth transition */
}
.bottle-image {
    width: 100px;
    height: 80px;
    height: auto;
}
.addicon {
    width: 16px;
    height: 16px;

    transition: opacity 0.3s ease-in-out;
}

/* Add Button */
.add-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: white;
    border: none;
    font-size: 18px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

/* Info Section */
.bottle-info {
    margin-top: 10px;
}

.bottle-name {
    font-size: 14px;
    color: #444;
}

/* Price Section */
.price-section {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
}

.discounted-price {
    font-weight: bold;
    font-size: 16px;
}

.original-price {
    font-size: 14px;
    color: gray;
    text-decoration: line-through;
}
</style>
