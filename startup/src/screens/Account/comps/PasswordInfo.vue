<template>
    <div class="password-info">
        <div class="form-group">
            <div class="password-wrapper col">
                <label for="password">Одоогийн нууц үг</label>
                <div class="password-input-container">
                    <input
                        class="form-control"
                        :class="{
                            'border-danger': error.current,
                        }"
                        :type="showCurrent ? 'text' : 'password'"
                        v-model="form.currentPassword"
                        id="password"
                        @input="error.current = false" />
                    <img
                        @click="showCurrent = !showCurrent"
                        :src="
                            showCurrent
                                ? require('@/assets/svgicons/hide.svg')
                                : require('@/assets/svgicons/show.svg')
                        "
                        alt="toggle"
                        class="toggle-icon" />
                </div>
            </div>
        </div>

        <!-- New password + Confirm -->
        <div class="form-row">
            <div class="password-wrapper col">
                <label for="password">Шинэ нууц үг</label>
                <div class="password-input-container">
                    <input
                        class="form-control"
                        :class="{
                            'border-danger': error.newPass,
                        }"
                        :type="showNew ? 'text' : 'password'"
                        v-model="form.newPassword"
                        id="password"
                        @input="error.newPass = false" />
                    <img
                        @click="showNew = !showNew"
                        :src="
                            showNew
                                ? require('@/assets/svgicons/hide.svg')
                                : require('@/assets/svgicons/show.svg')
                        "
                        alt="toggle"
                        class="toggle-icon" />
                </div>
            </div>

            <div class="password-wrapper col">
                <label for="password">Шинэ нууц үг баталгаажуулах</label>
                <div class="password-input-container">
                    <input
                        class="form-control"
                        :class="{
                            'border-danger': error.newPass2,
                        }"
                        :type="showConfirm ? 'text' : 'password'"
                        v-model="form.confirmPassword"
                        id="password"
                        @input="error.newPass2 = false" />
                    <img
                        @click="showConfirm = !showConfirm"
                        :src="
                            showConfirm
                                ? require('@/assets/svgicons/hide.svg')
                                : require('@/assets/svgicons/show.svg')
                        "
                        alt="toggle"
                        class="toggle-icon" />
                </div>
            </div>
        </div>

        <button class="save-btn btn-primary" @click="submitPassword">
            Нууц үг солих
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
import alertModal from '@/components/alertModal.vue';
export default {
    name: 'PasswordInfo',
    data() {
        return {
            form: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            showCurrent: false,
            showNew: false,
            showConfirm: false,
            error: {
                current: false,
                newPass: false,
                newPass2: false,
            },
            message: '',
            title: 'Нууц үг шинэчлэх',
            alertType: 'success',
            showAlert: false,
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
        console.log(this.userData);
    },
    methods: {
        async submitPassword() {
            let err = false;
            const current = this.form.currentPassword?.trim();
            const newPass = this.form.newPassword?.trim();
            const newPass2 = this.form.confirmPassword?.trim();
            if (!current) {
                err = true;
                this.error.current = true;
            }
            if (!newPass) {
                err = true;
                this.error.newPass = true;
            }
            if (!newPass2) {
                err = true;
                this.error.newPass2 = true;
            }

            if (this.form.newPassword !== this.form.confirmPassword) {
                err = true;
                this.error.newPass = true;
                this.error.newPass2 = true;
                this.$toast.error('Нууц үг зөрж байна.');
            }
            console.log(err);
            if (!err) {
                try {
                    await api.updateUser(this.userData.id, {
                        currentPassword: this.form.currentPassword,
                        newPassword: this.form.newPassword,
                    });
                    this.message = 'Нууц үг амжилттай шинэчлэгдлээ.';
                    this.alertType = 'success';
                    this.showAlert = true;
                    this.form.currentPassword = '';
                    this.form.newPassword = '';
                    this.form.confirmPassword = '';
                } catch (error) {
                    this.message = error.response.data.message;
                    this.showAlert = true;
                    this.alertType = 'error';
                }
            }
        },

        handleClose() {
            // console.log('test');
        },
    },
};
</script>

<style scoped>
.password-info {
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.half {
    flex: 1;
    min-width: 280px;
}
/* 
.password-field {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
} */

.password-field img {
    width: 18px;
    height: 18px;
    margin: 0 10px;
    cursor: pointer;
    opacity: 0.6;
}

.password-field img:hover {
    opacity: 1;
}

.save-btn {
    padding: 12px;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
}

.border-danger:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    outline: none;
}

.password-input-container {
    position: relative;
}

.toggle-icon {
    position: absolute;
    right: 10px;
    top: 45%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    cursor: pointer;
    opacity: 0.6;
}

.toggle-icon:hover {
    opacity: 1;
}

/* .password-wrapper {
    margin-bottom: 16px;
} */
</style>
