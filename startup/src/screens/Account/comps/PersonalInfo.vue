<template>
    <div class="personal-info gap-2">
        <label>Таны нэр</label>
        <input
            class="form-control"
            type="text"
            v-model="user.firstName"
            :class="{
                'border-danger': error.fname,
            }"
            @input="error.fname = false" />

        <label>Таны овог</label>
        <input
            class="form-control"
            type="text"
            v-model="user.lastName"
            :class="{
                'border-danger': error.lname,
            }"
            @input="error.lname = false" />

        <label>Төрсөн өдөр</label>
        <div class="birthdate">
            <input
                class="form-control"
                type="date"
                v-model="user.birthDate"
                :class="{
                    'border-danger': error.dob,
                }"
                @input="error.dob = false" />
        </div>
        <button
            class="save-btn btn-primary"
            :disabled="!isChanged"
            @click="changePassword">
            Өөрчлөлт хадгалах
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
import { setData } from '@/Utils/LocalStorage';
export default {
    name: 'PersonalInfo',
    props: {
        userData: {
            type: Object,
            default: () => ({}),
        },
        update: {
            type: Function,
        },
    },

    components: {
        alertModal,
    },
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                birthDate: '',
            },
            originalUser: null, // хадгалах хувилбар

            message: '',
            title: 'Хувийн мэдээлэл засах',
            alertType: 'success',
            showAlert: false,
            error: {
                fname: false,
                lname: false,
                dob: false,
            },
        };
    },
    computed: {
        isChanged() {
            return (
                this.user.firstName !== this.originalUser?.FirstName ||
                this.user.lastName !== this.originalUser?.LastName ||
                this.user.birthDate !== this.originalUser?.BirthDay
            );
        },
    },
    mounted() {
        console.log('user data in personal info:', this.userData);
        this.user.firstName = this.userData?.fname || '';
        this.user.lastName = this.userData?.lname || '';
        if (this.userData?.dob) {
            const date = new Date(this.userData.dob);
            if (!isNaN(date.getTime())) {
                this.user.birthDate = date.toISOString().slice(0, 10);
            }
        }

        // хадгалах анхны утгууд
        this.originalUser = {
            FirstName: this.user.firstName,
            LastName: this.user.lastName,
            BirthDay: this.user.birthDate,
        };
    },
    methods: {
        async changePassword() {
            // if (
            //     !this.user.firstName?.trim() ||
            //     !this.user.lastName?.trim() ||
            //     !this.user.birthDate?.trim()
            // ) {
            //     this.$toast.error('Талбарууд бөглөнө үү.');
            //     return;
            // }
            let err = false;
            const fname = this.user.firstName?.trim();
            const lname = this.user.lastName?.trim();
            if (!fname) {
                err = true;
                this.error.fname = true;
            }
            if (!lname) {
                err = true;
                this.error.lname = true;
            }
            if (!this.user.birthDate) {
                err = true;
                this.error.dob = true;
            }
            // console.log(this.user.birthDate);
            if (!err) {
                try {
                    await api.updateUser(this.userData.id, {
                        FirstName: this.user.firstName,
                        LastName: this.user.lastName,
                        BirthDay: this.user.birthDate,
                    });

                    let user = await api.getUser(this.userData.id);
                    setData('userData', user);
                    this.update();
                    this.message = 'Амжилттай хувийн мэдээлэл засварлалаа.';
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
        handleClose() {
            // console.log('test');
        },
    },
};
</script>

<style scoped>
.personal-info {
    display: flex;
    flex-direction: column;
    max-width: 500px;
}

label {
    font-weight: 500;
    font-size: 14px;
}

input,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
}

.birthdate {
    display: flex;
    gap: 12px;
}

.birthdate select,
.birthdate input[type='date'] {
    flex: 1;
}

.save-btn {
    width: fit-content;
    padding: 12px 24px;
    /* background-color: #000; */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
}

.border-danger:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    outline: none;
}
</style>
