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

        <!-- <span>{{ email }}</span> -->
        <div class="d-flex flex-row align-items-center gap-2 mb-3 mt-4">
            <input
                class="form-control"
                type="text"
                v-model="email"
                :class="{
                    'border-danger': error,
                }"
                @input="error = false" />

            <img
                src="@/assets/svgicons/check.svg"
                alt="Verified"
                class="check-icon" />
        </div>

        <button
            class="change-btn btn-primary"
            @click="changeEmail"
            :disabled="!isPhoneChanged">
            Цахим хаяг солих
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
    name: 'EmailInfo',
    data() {
        return {
            email: null,
            message: '',
            originalEmail: null, // ← нэмэх
            title: 'Имэйл хаяг солих',
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
        this.email = this.userData.email.toString();
        this.originalEmail = this.email; // ← нэмэх
    },
    methods: {
        handleClose() {
            // console.log('test');
        },
        async changeEmail() {
            let err = false;
            const mail = this.email?.trim();
            if (!mail) {
                err = true;
                this.error = true;
            }
            if (!err) {
                try {
                    await api.updateUser(this.userData.id, {
                        Email: this.email,
                    });
                    let user = await api.getUser(this.userData.id);
                    setData('userData', user);
                    this.update();
                    this.message = 'Амжилттай имэйл хаяг солигдлоо.';
                    this.alertType = 'success';
                    this.showAlert = true;
                } catch (error) {
                    console.log(error);
                    this.message = 'Алдаа гарлаа дахин оролдоно уу.';
                    this.showAlert = true;
                    this.alertType = 'error';
                }
            }
        },
    },
    computed: {
        isPhoneChanged() {
            if (this.email == null || this.originalEmail == null) return false;
            return this.email.toString() !== this.originalEmail.toString();
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

.border-danger:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    outline: none;
}
</style>
