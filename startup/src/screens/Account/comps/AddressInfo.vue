<template>
    <div class="d-flex col flex-column">
        <h4 class="mt-4 mb-3">Хүргэлтийн хаяг</h4>
        <div class="d-flex flex-column h-100">
            <div
                class="d-flex loc-cont flex-wrap justify-content-between gap-2">
                <locationItem
                    v-for="item in LocationItems"
                    :key="item.id"
                    :location="item"
                    :selected="selectedId"
                    @select="selectLocation"
                    @edit="openEditModal"
                    @remove="showModal(1, item)"
                    @loadLocations="loadLocations" />
            </div>
            <div class="d-flex flex-row w-100" v-if="!locAddFormShow">
                <button class="btn-secondar mt-4 w-100" @click="toggle">
                    Хүргэлтийн хаяг нэмэх
                </button>
            </div>
            <div class="d-flex flex-row w-100 gap-4" v-else>
                <button class="btn-secondar mt-4 col" @click="toggle">
                    Цуцлах
                </button>
                <button class="btn-primary mt-4 col" @click="saveLocation">
                    {{ locBtnText }}
                </button>
            </div>
            <div v-if="locAddFormShow" class="d-flex flex-column gap-2">
                <div class="row-2 d-flex flex-row gap-3 mt-3 align-items-end">
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;
                            <p>Хаягийн нэр</p>
                        </div>
                        <input
                            type="text"
                            v-model="editedLocation.name"
                            placeholder="Гэр, Ажил"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': error.title,
                            }"
                            maxlength="100"
                            @input="error.title = false" />
                    </div>
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;
                            <p>Дүүрэг</p>
                        </div>
                        <input
                            type="text"
                            v-model="editedLocation.district"
                            placeholder="Дүүрэг"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': error.district,
                            }"
                            @input="error.district = false"
                            maxlength="50" />
                    </div>
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;
                            <p>Хороо</p>
                        </div>
                        <input
                            type="text"
                            v-model="editedLocation.subdistrict"
                            placeholder="Хороо"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': error.subdistrict,
                            }"
                            @input="error.subdistrict = false"
                            maxlength="50" />
                    </div>
                </div>
                <div class="d-flex flex-row gap-1 align-items-center">
                    <input
                        type="checkbox"
                        v-model="editedLocation.isAnotherPersonRecieve"
                        class="form-check-input"
                        @change="handleCheckboxToggle" />
                    <p>Өөр хүн хүлээж авна</p>
                </div>
                <div
                    v-if="editedLocation.isAnotherPersonRecieve"
                    class="row-2 d-flex flex-row gap-3 mt-1 align-items-end">
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;
                            <p>Нэр</p>
                        </div>
                        <input
                            type="text"
                            v-model="editedLocation.anotherPerson.f_name"
                            placeholder="Нэр оруулна уу"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': error.f_name,
                            }"
                            @input="error.f_name = false"
                            maxlength="60" />
                    </div>
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;

                            <p>Овог</p>
                        </div>
                        <input
                            type="text"
                            v-model="editedLocation.anotherPerson.l_name"
                            placeholder="Овог оруулна уу"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': error.l_name,
                            }"
                            @input="error.l_name = false"
                            maxlength="60" />
                    </div>
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;
                            <p>Утасны дугаар</p>
                        </div>
                        <input
                            type="number"
                            v-model="editedLocation.anotherPerson.phone_number"
                            placeholder="Утасны дугаар оруулна уу"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': error.phone_number,
                            }"
                            @input="limitPhoneNumber($event)" />
                    </div>
                </div>
                <div class="d-flex flex-column gap-1">
                    <div class="d-flex flex-row">
                        <span class="text-danger">* </span>&nbsp;
                        <p>Дэлгэрэнгүй мэдээлэл</p>
                    </div>
                    <textarea
                        v-model="editedLocation.detail"
                        placeholder="Та хаягаа зөв дэлгэрэнгүй, тодорхой оруулаагүйгээс үүдэн хүргэлт удаашрах, эсвэл хүргэгдэхгүй байж болзошгүйг анхаарна уу."
                        class="form-control custom-placeholder"
                        style="height: 74px; overflow-y: auto; resize: none"
                        maxlength="250"
                        :class="{
                            'border-danger': error.detail,
                        }"
                        @input="error.detail = false"></textarea>
                </div>
            </div>
        </div>
        <b-modal
            v-model="removeModalVisible"
            title="Хүргэлтийн хаяг устгах"
            hide-footer
            centered>
            <div class="modal-body">
                <div class="d-flex flex-row align-items-center">
                    <h6 class="mb-0">test</h6>
                    <p>- test,text-shadow, tesadf</p>
                </div>
                <p>dtail</p>
                <p>Та хүргэлтийн хаягийг устгахдаа итгэлтэй байна уу?</p>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-3">
                <button
                    class="modal-btn cancel"
                    @click="removeModalVisible = false">
                    Cancel
                </button>
                <button
                    class="modal-btn confirm"
                    @click="deleteLocationConfirm">
                    Remove
                </button>
            </div>
        </b-modal>
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
import AlertModal from '@/components/alertModal.vue';
import locationItem from '@/components/locationItem.vue';
import api from '@/services/api';
import { getData } from '@/Utils/LocalStorage';
export default {
    name: 'CartPage',
    components: { locationItem, AlertModal },
    data() {
        return {
            LocationItems: [],
            editedLocation: {
                id: null,
                name: '',
                city: '',
                district: '',
                subdistrict: '',
                detail: '',
                isAnotherPersonRecieve: false,
                anotherPerson: {
                    f_name: '',
                    l_name: '',
                    phone_number: null,
                },
            },
            locAddFormShow: false,
            locBtnText: 'Нэмэх',
            error: {
                title: false,
                district: false,
                subdistrict: false,
                detail: false,
                f_name: false,
                l_name: false,
                phone_number: false,
            },
            op: 1,
            removeModalVisible: false,
            selectedId: null,
            selectedLocation: null,

            message: '',
            title: 'Хувийн мэдээлэл засах',
            alertType: 'success',
            showAlert: false,
            userData: null,
        };
    },
    mounted() {
        this.userData = getData('userData');
        this.loadLocations();
    },
    methods: {
        handleClose() {
            // console.log('test');
        },
        handleCheckboxToggle() {
            if (this.editedLocation.isAnotherPersonRecieve) {
                this.error.f_name = false;
                this.error.l_name = false;
                this.error.phone_number = false;
            }
            if (this.op == 1) {
                this.editedLocation.anotherPerson.f_name = '';
                this.editedLocation.anotherPerson.l_name = '';
                this.editedLocation.anotherPerson.phone_number = '';
            }
            if (this.op == 2 && this.editedLocation.isAnotherPersonRecieve) {
                this.editedLocation.anotherPerson.f_name =
                    this.selectedLocation.f_name;
                this.editedLocation.anotherPerson.l_name =
                    this.selectedLocation.l_name;
                this.editedLocation.anotherPerson.phone_number =
                    this.selectedLocation.phone_number;
            }
        },
        selectLocation(id) {
            this.selectedId = id;
            this.selectedLocation = this.LocationItems.find(
                (i) => i.LocationId === id
            );
        },
        openEditModal(item) {
            this.error.title = false;
            this.error.district = false;
            this.error.subdistrict = false;
            this.error.f_name = false;
            this.error.l_name = false;
            this.error.phone_number = false;
            this.error.detail = false;

            this.editedLocation.id = item.LocationId;
            this.editedLocation.name = item.Title;
            this.editedLocation.city = item.Hot;
            this.editedLocation.district = item.Duureg;
            this.editedLocation.subdistrict = item.Horoo;

            this.editedLocation.detail = item.Detail;
            this.editedLocation.isAnotherPersonRecieve = item.isAnotherPerson;
            if (this.editedLocation.isAnotherPersonRecieve) {
                this.editedLocation.anotherPerson.f_name = item.f_name;
                this.editedLocation.anotherPerson.l_name = item.l_name;
                this.editedLocation.anotherPerson.phone_number =
                    item.phone_number;
            }
            this.locAddFormShow = true;
            this.op = 2;
            this.locBtnText = 'Хадгалах';
        },
        showModal(op) {
            if (op == 1) {
                this.removeModalVisible = true;
            }
        },
        async loadLocations() {
            this.LocationItems = await api.getLocationsByUser(this.userData.id);
        },
        toggle() {
            this.locAddFormShow = !this.locAddFormShow;
            this.locBtnText = 'Нэмэх';

            this.editedLocation.id = null;
            this.editedLocation.name = '';
            this.editedLocation.city = '';
            this.editedLocation.district = '';
            this.editedLocation.subdistrict = '';
            this.editedLocation.detail = '';

            this.error.title = false;
            this.error.district = false;
            this.error.subdistrict = false;
            this.error.detail = false;
            this.editedLocation.isAnotherPersonRecieve = false;
            this.op = 1;
        },
        async saveLocation() {
            if (this.validate(1)) {
                if (this.op == 1) {
                    let data = {
                        UserId: this.userData.id,
                        Title: this.editedLocation.name,
                        Hot: this.editedLocation.district,
                        Duureg: this.editedLocation.district,
                        Horoo: this.editedLocation.subdistrict,
                        Detail: this.editedLocation.detail,
                        isAnotherPerson:
                            this.editedLocation.isAnotherPersonRecieve,
                        f_name: this.editedLocation.anotherPerson.f_name,
                        l_name: this.editedLocation.anotherPerson.l_name,
                        phone_number:
                            this.editedLocation.anotherPerson.phone_number,
                    };

                    this.title = 'Хүргэлтийн хаяг нэмэх';
                    try {
                        const res = await api.createLocation(data);
                        console.log('📦 Location created:', res);
                        this.message = 'Амжилттай хүргэлтийн хаяг үүсгэлээ.';
                        this.alertType = 'success';
                        this.showAlert = true;
                    } catch (err) {
                        console.error('❌ Failed to create location:', err);
                        this.message =
                            'Шинээр хүргэлтийн хаяг үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.';
                        this.alertType = 'error';
                        this.showAlert = true;
                    }
                }

                if (this.op == 2) {
                    let data = {
                        UserId: this.userData.id,
                        Title: this.editedLocation.name,
                        Hot: this.editedLocation.district,
                        Duureg: this.editedLocation.district,
                        Horoo: this.editedLocation.subdistrict,
                        Detail: this.editedLocation.detail,
                        isAnotherPerson:
                            this.editedLocation.isAnotherPersonRecieve,
                        f_name: this.editedLocation.anotherPerson.f_name,
                        l_name: this.editedLocation.anotherPerson.l_name,
                        phone_number:
                            this.editedLocation.anotherPerson.phone_number,
                    };

                    this.title = 'Хүргэлтийн хаяг засах';
                    try {
                        await api.updateLocation(this.editedLocation.id, data);
                        this.message = 'Амжилттай хүргэлтийн хаяг засварлалаа.';
                        this.alertType = 'success';
                        this.showAlert = true;
                    } catch (err) {
                        this.message =
                            'Амжилттай хүргэлтийн хаяг засварлахад алдаа гарлаа. Дахин оролдоно уу.';
                        this.alertType = 'error';
                        this.showAlert = true;
                    }
                }

                this.loadLocations();
                this.toggle();
            }
        },
        deleteLocationConfirm() {
            try {
                api.deleteLocation(this.selectedId).then(() => {
                    this.removeModalVisible = false;
                    this.loadLocations();
                    if (this.locAddFormShow == true) {
                        this.toggle();
                    }
                });

                this.$toast.success('Амжилттай хүргэлтийн хаяг устгалаа.');
            } catch (error) {
                this.$toast.error(
                    'Хүргэлтийн хаяг устгахад алдаа гарлаа. Дахин оролдоно уу.'
                );
            }
        },
        validate(op) {
            let err = true;
            if (op == 1) {
                const name = this.editedLocation.name.trim();
                const district = this.editedLocation.district.trim();
                const subdistrict = this.editedLocation.subdistrict.trim();
                const detail = this.editedLocation.detail.trim();
                // Check if any field is empty or contains only s
                if (!name) {
                    this.error.title = true;
                    err = false;
                }
                if (!district) {
                    this.error.district = true;
                    err = false;
                }
                if (!subdistrict) {
                    this.error.subdistrict = true;
                    err = false;
                }
                if (!detail) {
                    this.error.detail = true;
                    err = false;
                }

                if (this.editedLocation.isAnotherPersonRecieve == true) {
                    const f = this.editedLocation.anotherPerson.f_name.trim();
                    const l = this.editedLocation.anotherPerson.l_name.trim();
                    const p = this.editedLocation.anotherPerson.phone_number;
                    if (!f) {
                        this.error.f_name = true;
                        err = false;
                    }
                    if (!l) {
                        this.error.l_name = true;
                        err = false;
                    }

                    if (!p || p.toString().length !== 8) {
                        this.error.phone_number = true;
                        err = false;
                    }
                }
            }

            // All fields are valid
            return err;
        },
    },
};
</script>

<style>
.modal-btn.cancel {
    background-color: gray;
    color: white;
}

.modal-btn.confirm {
    background-color: #6c63ff;
    color: white;
}

/* Modal Buttons */
.modal-btn {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
}

.border-danger:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    outline: none;
}
</style>
