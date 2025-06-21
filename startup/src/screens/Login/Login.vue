<template>
    <div class="auth-page">
        <h1 class="title">Тавтай морил</h1>
        <div class="auth-container">
            <!-- Login Section -->
            <div class="auth-card">
                <h2>Нэвтрэх</h2>
                <label>Цахим хаяг эсвэл утасны дугаар</label>
                <input
                    class="form-control"
                    :class="{
                        'border-danger': errorLogin.name,
                    }"
                    type="text"
                    placeholder="цахим хаяг эсвэл утас"
                    v-model="login.email"
                    @input="errorLogin.name = false" />
                <div class="password-wrapper">
                    <label for="password">Нууц үг</label>
                    <div class="password-input-container">
                        <input
                            class="form-control"
                            :class="{
                                'border-danger': errorLogin.password,
                            }"
                            :type="login.showPassword ? 'text' : 'password'"
                            v-model="login.password"
                            id="password"
                            @input="errorLogin.password = false" />
                        <img
                            @click="login.showPassword = !login.showPassword"
                            :src="
                                login.showPassword
                                    ? require('@/assets/svgicons/hide.svg')
                                    : require('@/assets/svgicons/show.svg')
                            "
                            alt="toggle"
                            class="toggle-icon" />
                    </div>
                </div>

                <div class="terms d-flex flex-row align-items-start">
                    <input
                        class="form-check-input"
                        :class="{
                            'border-danger': errorLogin.check,
                        }"
                        style="width: auto; margin-top: 6px; margin-right: 4px"
                        type="checkbox"
                        v-model="login.agree"
                        @input="errorLogin.check = false" />
                    <a href="#"
                        >Би үйлчилгээний нөхцөл болон нууцлалын бодлогыг
                        зөвшөөрч байна</a
                    >
                </div>

                <button class="auth-button btn-primary" @click="call(1)">
                    Нэвтрэх
                </button>
            </div>

            <!-- Register Section -->
            <div class="auth-card">
                <h2>Бүртгүүлэх</h2>
                <div class="row">
                    <div class="col">
                        <label>Таны нэр</label>
                        <input
                            class="form-control"
                            :class="{
                                'border-danger': errorRegister.fname,
                            }"
                            type="text"
                            placeholder="Нэр"
                            v-model="register.firstName"
                            @input="errorRegister.fname = false" />
                    </div>
                    <div class="col">
                        <label>Таны овог</label>
                        <input
                            class="form-control"
                            :class="{
                                'border-danger': errorRegister.lname,
                            }"
                            type="text"
                            placeholder="Овог"
                            v-model="register.lastName"
                            @input="errorRegister.lname = false" />
                    </div>
                </div>

                <label>Төрсөн өдөр</label>
                <input
                    type="date"
                    :class="{
                        'border-danger': errorRegister.bd,
                    }"
                    class="form-control"
                    v-model="register.birthDate"
                    @input="errorRegister.bd = false" />

                <label>Хүйс</label>
                <select
                    class="form-select"
                    :class="{
                        'border-danger': errorRegister.gender,
                    }"
                    v-model="register.gender"
                    @input="errorRegister.gender = false">
                    <option disabled value="">Хүйс</option>
                    <option>Эр</option>
                    <option>Эм</option>
                </select>

                <div class="row">
                    <div class="col">
                        <label>Цахим хаяг</label>
                        <input
                            :class="{
                                'border-danger': errorRegister.email,
                            }"
                            class="form-control"
                            type="email"
                            placeholder="name@email.com"
                            v-model="register.email"
                            @input="errorRegister.email = false" />
                    </div>
                    <div class="col">
                        <label>Утасны дугаар</label>
                        <input
                            class="form-control"
                            :class="{
                                'border-danger': errorRegister.phone,
                            }"
                            type="text"
                            placeholder="0000 0000"
                            v-model="register.phone"
                            @input="errorRegister.phone = false" />
                    </div>
                </div>
                <div class="password-wrapper">
                    <label for="password">Нууц үг</label>
                    <div class="password-input-container">
                        <input
                            class="form-control"
                            :class="{
                                'border-danger': errorRegister.password,
                            }"
                            :type="register.showPassword ? 'text' : 'password'"
                            v-model="register.password"
                            id="password"
                            @input="errorRegister.password = false" />
                        <img
                            @click="
                                register.showPassword = !register.showPassword
                            "
                            :src="
                                register.showPassword
                                    ? require('@/assets/svgicons/hide.svg')
                                    : require('@/assets/svgicons/show.svg')
                            "
                            alt="toggle"
                            class="toggle-icon" />
                    </div>
                </div>
                <div class="d-flex flex-column gap-1">
                    <div class="d-flex flex-row gap-2 align-items-center">
                        <img
                            style="width: 14px; height: 14px"
                            :src="
                                passCheck.bigletters
                                    ? require('@/assets/images/checked_green.png')
                                    : require('@/assets/images/checked_grey.png')
                            "
                            alt="toggle" />
                        <small> Том үсэг ашигласан байх </small>
                    </div>
                    <div class="d-flex flex-row gap-2 align-items-center">
                        <img
                            style="width: 14px; height: 14px"
                            :src="
                                passCheck.digits
                                    ? require('@/assets/images/checked_green.png')
                                    : require('@/assets/images/checked_grey.png')
                            "
                            alt="toggle" />
                        <small> Тоо ашигласан байх</small>
                    </div>
                    <div class="d-flex flex-row gap-2 align-items-center">
                        <img
                            style="width: 14px; height: 14px"
                            :src="
                                passCheck.symbols
                                    ? require('@/assets/images/checked_green.png')
                                    : require('@/assets/images/checked_grey.png')
                            "
                            alt="toggle" />
                        <small> Тэмдэгт ашигласан байх </small>
                    </div>
                    <div class="d-flex flex-row gap-2 align-items-center">
                        <img
                            style="width: 14px; height: 14px"
                            :src="
                                passCheck.length
                                    ? require('@/assets/images/checked_green.png')
                                    : require('@/assets/images/checked_grey.png')
                            "
                            alt="toggle" />
                        <small> Нууц үгийн урт 8-аас багагүй байх </small>
                    </div>
                </div>
                <div class="terms d-flex flex-row align-items-start">
                    <input
                        class="form-check-input"
                        :class="{
                            'border-danger': errorRegister.check,
                        }"
                        style="width: auto; margin-top: 6px; margin-right: 4px"
                        type="checkbox"
                        v-model="register.agree"
                        @input="errorRegister.check = false" />
                    <a href="#"
                        >Би үйлчилгээний нөхцөл болон нууцлалын бодлогыг
                        зөвшөөрч байна</a
                    >
                </div>

                <button class="auth-button btn-primary" @click="call(2)">
                    Бүртгүүлэх
                </button>
            </div>
        </div>

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
import alertModal from '@/components/alertModal.vue';
import api from '@/services/api';
import { setData } from '@/Utils/LocalStorage';
export default {
    name: 'LoginPage',
    components: {
        alertModal,
    },
    data() {
        return {
            showAlert: false,
            message: '',
            title: 'Бүртгэл',
            alertType: 'success',
            login: {
                email: '',
                password: '',
                showPassword: false,
                agree: false,
            },
            register: {
                firstName: 'test',
                lastName: 'test',
                birthDate: '2002-10-06',
                gender: 'Эр',
                email: 'msn@a.com',
                phone: '90201310',
                password: 'Adiya1006!',
                showPassword: false,
                agree: false,
            },
            errorLogin: {
                name: false,
                password: false,
                check: false,
            },
            errorRegister: {
                lname: false,
                fname: false,
                bd: false,
                gender: false,
                email: false,
                phone: false,
                password: false,
                check: false,
            },
            passCheck: {
                bigletters: false,
                digits: false,
                symbols: false,
                length: false,
            },
        };
    },
    methods: {
        handleClose() {
            console.log('test');
        },
        async call(op) {
            if (op == 1) {
                if (this.validateLogin()) {
                    let data = {
                        Username: this.login.email,
                        Password: this.login.password,
                    };
                    console.log('redy to login', data);
                    try {
                        let result = await api.loginUser(data);
                        console.log(result);
                        await setData('userData', result);
                        // let dataTest = getData('userData');
                        // console.log('datates : ', dataTest);
                        this.$toast.success('Амжилттай нэвтэрлээ.');
                    } catch (error) {
                        // console.log(
                        //     'Aldaa:',
                        //     error.response?.data?.message || error.message
                        // );
                        this.$toast.error(
                            error.response?.data?.message || 'Алдаа гарлаа'
                        );
                    }
                }
            }
            if (op == 2) {
                if (this.validateRegister()) {
                    let data = {
                        FirstName: this.register.firstName,
                        LastName: this.register.lastName,
                        BirthDay: this.register.birthDate,
                        Genter: this.register.gender === 'Эр' ? 1 : 0,
                        Email: this.register.email,
                        PhoneNumber: this.register.phone,
                        Role: 'customer',
                        BranchId: null,
                        Password: this.register.password,
                    };

                    console.log('redy to register', data);
                    try {
                        let newUser = await api.createUser(data);
                        console.log(newUser);
                        this.message = 'Таны бүртгэл амжилттай үүслээ.';
                        this.alertType = 'success';
                        this.showAlert = true;

                        this.register.firstName = '';
                        this.register.lastName = '';
                        this.register.birthDate = '';
                        this.register.gender = '';
                        this.register.email = '';
                        this.register.phone = '';
                        this.register.password = '';
                        this.register.showPassword = false;
                        this.register.agree = false;
                    } catch (error) {
                        console.error(
                            '❌ Registration failed:',
                            error.response?.data || error.message
                        );
                        this.message = error.message;
                        this.showAlert = true;
                        this.alertType = 'error';
                    }
                }
            }
        },

        validateLogin() {
            let err = true;
            const name = this.login.email.trim();
            const password = this.login.password.trim();
            if (!name) {
                this.errorLogin.name = true;
                err = false;
            }
            if (!password) {
                this.errorLogin.password = true;
                err = false;
            }
            if (!this.login.agree) {
                this.errorLogin.check = true;
                err = false;
            }
            // Add login request here...
            return err;
        },

        validateRegister() {
            let err = true;
            const firstName = this.register.firstName.trim();
            const lastName = this.register.lastName.trim();
            const birthDate = this.register.birthDate.trim();
            const gender = this.register.gender.trim();
            const email = this.register.email.trim();
            const phone = this.register.phone.trim();
            const password = this.register.password.trim();
            if (!firstName) {
                this.errorRegister.fname = true;
                err = false;
            }

            if (!lastName) {
                this.errorRegister.lname = true;
                err = false;
            }

            if (!birthDate) {
                this.errorRegister.bd = true;
                err = false;
            }

            if (!gender) {
                this.errorRegister.gender = true;
                err = false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (
                !email ||
                !email.includes('@') ||
                !email.endsWith('.com') ||
                !emailRegex.test(email)
            ) {
                this.errorRegister.email = true;
                err = false;
            }

            // Phone number check
            const phoneRegex = /^[0-9]{8}$/;
            if (!phone || !phoneRegex.test(phone)) {
                this.errorRegister.phone = true;
                err = false;
            }

            // Password strength check
            const passwordRegex =
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!password || !passwordRegex.test(password)) {
                this.errorRegister.password = true;
                err = false;
            }

            if (!this.register.agree) {
                this.errorRegister.check = true;
                err = false;
            }
            return err;
        },
    },
    watch: {
        'register.password'(newVal) {
            this.passCheck.bigletters = /[A-Z]/.test(newVal);
            this.passCheck.digits = /[0-9]/.test(newVal);
            this.passCheck.symbols = /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(newVal);
            this.passCheck.length = newVal.length >= 8;
        },
    },
};
</script>

<style scoped>
.auth-page {
    padding: 40px;
    background: #f9f9f9;
    font-family: 'Segoe UI', sans-serif;
}

.title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
}

.auth-container {
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
}

.auth-card {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.auth-card h2 {
    margin-bottom: 20px;
    font-size: 22px;
}

label {
    display: block;
    margin-top: 10px;
    font-weight: 500;
    font-size: 14px;
}

input,
select {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
}

.row {
    display: flex;
    gap: 10px;
}

.col {
    flex: 1;
}

.password-field {
    position: relative;
}

.password-field span {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}

.password-field .forgot {
    position: absolute;
    right: 35px;
    top: 10px;
    font-size: 12px;
    color: #555;
    text-decoration: underline;
}

.terms {
    font-size: 13px;
    margin-top: 10px;
}

.terms a {
    text-decoration: underline;
    color: #000;
}

.auth-button {
    width: 100%;
    padding: 12px;
    color: white;
    border: none;
    border-radius: 8px;
    margin-top: 15px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
}

.password-wrapper {
    margin-bottom: 16px;
}

.password-input-container {
    position: relative;
}

.password-input-container input {
    width: 100%;
    padding: 10px 36px 10px 10px; /* room for icon on right */
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
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

.border-danger:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    outline: none;
}
</style>
