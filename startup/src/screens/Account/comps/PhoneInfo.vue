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
            <div class="digit-box">
                <input
                    class="form-control"
                    type="number"
                    v-model="phone"
                    @input="onInput"
                    inputmode="numeric"
                    :class="{
                        'border-danger': error,
                    }" />
            </div>
        </div>

        <button
            class="submit-btn btn-primary"
            :disabled="!isPhoneChanged"
            @click="submitPhone">
            Дугаар оруулах
        </button>

        <template>
            <div>
                <alert-modal
                    :visible.sync="showAlert"
                    :title="title"
                    :message="message"
                    :type="alertType"
                    @close="handleClose"
                    :hide="handleClose" />
            </div>
        </template>
    </div>
</template>

<script>
import api from '@/services/api';
import { setData } from '@/Utils/LocalStorage';
import alertModal from '@/components/alertModal.vue';
export default {
    name: 'PhoneInfo',
    data() {
        return {
            phoneDigits: Array(8).fill(''),
            phone: null,
            message: '',
            originalPhone: null, // ← нэмэх
            title: 'Утасны дугаар солих',
            alertType: 'success',
            showAlert: false,
            error: false,
        };
    },
    components: {
        alertModal,
    },
    props: {
        userData: {
            type: Object,
            default: () => ({}),
        },
        update: {
            type: Function,
        },
    },
    mounted() {
        const phoneAsInt = parseInt(this.userData.phone);
        console.log(this.userData);
        this.phoneDigits = this.userData.phone.toString().split('');
        this.phone = phoneAsInt;

        this.originalPhone = phoneAsInt.toString(); // ← нэмэх
    },
    methods: {
        onInput(event) {
            this.error = false;
            let value = event.target.value;

            // зөвхөн тоо хадгална, 8 оронтойгоор хязгаарлана
            value = value.replace(/\D/g, '').slice(0, 8);

            this.phone = value;
        },
        handleClose() {
            // console.log('test');
        },
        async submitPhone() {
            if (this.phone.length === 8 && /^\d+$/.test(this.phone)) {
                try {
                    await api.updateUser(this.userData.id, {
                        PhoneNumber: this.phone,
                    });
                    let user = await api.getUser(this.userData.id);
                    setData('userData', user);
                    this.update();
                    this.message = 'Амжилттай дугаар солигдлоо.';
                    this.alertType = 'success';
                    this.showAlert = true;
                } catch (error) {
                    console.log(error);
                    this.message = 'Алдаа гарлаа дахин оролдоно уу.';
                    this.showAlert = true;
                    this.alertType = 'error';
                }
            } else {
                this.error = true;
                this.$toast.error('Бүх 8 цифрийг оруулна уу.');
            }
        },
    },
    computed: {
        isPhoneChanged() {
            if (this.phone == null || this.originalPhone == null) return false;
            return this.phone.toString() !== this.originalPhone.toString();
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

.border-danger:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    outline: none;
}
</style>
