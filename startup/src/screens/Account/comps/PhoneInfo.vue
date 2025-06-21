<template>
    <div class="phone-info">
        <img
            src="@/assets/svgicons/phone.svg"
            alt="Phone Icon"
            class="phone-icon" />

        <h2 class="title">Дугаар оруулах</h2>
        <p class="subtitle">
            Та зөвхөн өөрийн нэр дээрх гар утасны дугаараас хүсэлт илгээх
            шаардлагатай.
        </p>

        <div class="phone-input-group">
            <div
                class="digit-box"
                v-for="(digit, index) in phoneDigits.slice(0, 4)"
                :key="index">
                <input
                    class="form-control"
                    maxlength="1"
                    v-model="phoneDigits[index]"
                    @input="focusNext(index, $event)" />
            </div>

            <span class="dash">-</span>

            <div
                class="digit-box"
                v-for="(digit, index) in phoneDigits.slice(4, 8)"
                :key="index + 4">
                <input
                    class="form-control"
                    maxlength="1"
                    v-model="phoneDigits[index + 4]"
                    @input="focusNext(index + 4, $event)" />
            </div>
        </div>

        <button class="submit-btn btn-primary" @click="submitPhone">
            Дугаар оруулах
        </button>
    </div>
</template>

<script>
export default {
    name: 'PhoneInfo',
    data() {
        return {
            phoneDigits: Array(8).fill(''),
        };
    },
    methods: {
        focusNext(index, event) {
            const value = event.target.value;
            if (value && index < 7) {
                const next = event.target.nextElementSibling;
                if (next && next.tagName === 'INPUT') next.focus();
            }
        },
        submitPhone() {
            const phone = this.phoneDigits.join('');
            if (phone.length === 8 && /^\d+$/.test(phone)) {
                alert('Таны оруулсан дугаар: ' + phone);
                // TODO: API call
            } else {
                alert('Бүх 8 цифрийг оруулна уу');
            }
        },
    },
};
</script>

<style scoped>
.phone-info {
    max-width: 400px;
    margin: auto;
    text-align: center;
}

.phone-icon {
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

.phone-input-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
}

.digit-box input {
    width: 40px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.dash {
    font-size: 20px;
    font-weight: bold;
    margin: 0 4px;
}

.submit-btn {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}
</style>
