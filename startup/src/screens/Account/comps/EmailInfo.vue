<template>
    <div class="email-info">
        <img
            src="@/assets/svgicons/email.svg"
            alt="Email Icon"
            class="email-icon" />

        <h2 class="title">Таны цахим хаяг баталгаажсан</h2>
        <p class="subtitle">
            Хэрэв та цахим хаягаа өөрчлөхийг хүсэж байгаа бол "Цахим хаяг солих"
            товч дээр дарна уу
        </p>

        <div class="email-display">
            <span>{{ email }}</span>
            <img
                src="@/assets/svgicons/check.svg"
                alt="Verified"
                class="check-icon" />
        </div>

        <button class="change-btn btn-primary" @click="changeEmail">
            Цахим хаяг солих
        </button>
    </div>
</template>

<script>
export default {
    name: 'EmailInfo',
    data() {
        return {
            email: 'msn.njr111006@gmail.com',
        };
    },
    methods: {
        changeEmail() {
            alert('Цахим хаяг солих үйлдлийг эхлүүлж байна...');
            // You could emit an event or navigate to a new email update page
        },
    },
};
</script>

<style scoped>
.email-info {
    max-width: 420px;
    margin: auto;
    text-align: center;
}

.email-icon {
    width: 30px;
    margin-bottom: 10px;
}

.title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
}

.subtitle {
    font-size: 13px;
    color: #777;
    margin-bottom: 20px;
}

.email-display {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 20px;
    gap: 10px;
    font-size: 15px;
}

.check-icon {
    width: 18px;
    height: 18px;
}

.change-btn {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}
</style>
