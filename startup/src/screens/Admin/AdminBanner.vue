<template>
    <div class="carousel-container">
        <div class="big-box">
            <img
                :src="require('@/assets/images/unnamed.png')"
                alt="Suggested Set"
                class="box-img" />
        </div>
        <div class="small-boxes">
            <div class="small-box green-box">
                <img
                    :src="require('@/assets/images/banner2.jpg')"
                    alt="Suggested Set"
                    class="box-img" />
            </div>
            <div class="small-box blue-box">
                <img
                    :src="require('@/assets/images/banner3.png')"
                    alt="Suggested Set"
                    class="box-img" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminBanner',
    data() {
        return {};
    },
};
</script>

<style scoped>
.carousel-container {
    display: flex;
    align-items: stretch;
    justify-content: center;
    background-color: #f6f6f6;
    gap: 20px;
    width: 100%;
    height: 500px;
}

/* Large Box */
.big-box {
    flex: 1;
    background-color: #e38787; /* Red */
    border-radius: 20px;
}
.big-box {
    flex: 1;
    background-color: #e38787;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
}
.box-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px; /* if you want rounded corners */
}
/* Small Boxes Container */
.small-boxes {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 20px;
}

/* Small Boxes */
.small-box {
    flex: 1;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

/* Green Box */
.green-box {
    background-color: #b2e59c;
}

/* Blue Box */
.blue-box {
    background-color: #647ce6;
}
</style>
