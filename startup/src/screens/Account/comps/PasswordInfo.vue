<template>
    <div class="password-info">
        <!-- Current password -->
        <div class="form-group">
            <label>Одоогийн нууц үг</label>
            <div class="password-field">
                <input
                    :type="showCurrent ? 'text' : 'password'"
                    v-model="form.currentPassword" />
                <img
                    @click="showCurrent = !showCurrent"
                    src="@/assets/svgicons/show.svg"
                    alt="toggle" />
            </div>
        </div>

        <!-- New password + Confirm -->
        <div class="form-row">
            <div class="form-group half">
                <label>Шинэ нууц үг</label>
                <div class="password-field">
                    <input
                        :type="showNew ? 'text' : 'password'"
                        v-model="form.newPassword" />
                    <img
                        @click="showNew = !showNew"
                        src="@/assets/svgicons/show.svg"
                        alt="toggle" />
                </div>
            </div>

            <div class="form-group half">
                <label>Шинэ нууц үг баталгаажуулах</label>
                <div class="password-field">
                    <input
                        :type="showConfirm ? 'text' : 'password'"
                        v-model="form.confirmPassword" />
                    <img
                        @click="showConfirm = !showConfirm"
                        src="@/assets/svgicons/show.svg"
                        alt="toggle" />
                </div>
            </div>
        </div>

        <button class="save-btn btn-primary" @click="submitPassword">
            Нууц үг солих
        </button>
    </div>
</template>

<script>
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
        };
    },
    methods: {
        submitPassword() {
            if (
                !this.form.currentPassword ||
                !this.form.newPassword ||
                !this.form.confirmPassword
            ) {
                alert('Бүх талбарыг бөглөнө үү');
                return;
            }

            if (this.form.newPassword !== this.form.confirmPassword) {
                alert('Шинэ нууц үг таарахгүй байна');
                return;
            }

            alert('Нууц үг амжилттай солигдлоо');
            // TODO: API call here
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

.password-field {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
}

.password-field input {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
}

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
</style>
