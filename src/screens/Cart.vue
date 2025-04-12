<template>
    <div class="cart-page">
        <div class="d-flex flex-row gap-3 align-items-center">
            <p class="direction" style="color: orange">Миний сагс</p>
            <img
                :src="require('@/assets/svgicons/next.svg')"
                class="lil-icon"
                alt="next icon" />
            <p class="direction">Захиалгын хаяг</p>
            <img
                :src="require('@/assets/svgicons/next.svg')"
                class="lil-icon"
                alt="next icon" />
            <p class="direction">Баталгаажуулах</p>
        </div>

        <div class="d-flex flex-row gap-4 flex-wrap">
            <div class="d-flex col flex-column">
                <h4 class="mt-4 mb-3">Миний сагс</h4>
                <table class="cart-table">
                    <thead class="cart-table-thead">
                        <tr>
                            <th>Бүтээгдэхүүн</th>
                            <th
                                style="
                                    vertical-align: middle;
                                    text-align: center;
                                    min-width: 150px;
                                ">
                                Тоо хэмжээ
                            </th>
                            <th
                                style="
                                    vertical-align: middle;
                                    text-align: center;
                                ">
                                Үнэ
                            </th>
                            <th
                                style="
                                    vertical-align: middle;
                                    text-align: center;
                                "></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cartItems" :key="index">
                            <td class="product-info">
                                <div class="product-image-container">
                                    <img
                                        :src="
                                            require('@/assets/images/wine.png')
                                        "
                                        class="product-image"
                                        alt="Product Image" />
                                </div>
                                <div
                                    class="d-flex flex-column gap-2 justify-content-between">
                                    <p class="product-name mb-0">
                                        {{ item.ProductName }}
                                    </p>
                                    <p class="product-id mb-0">
                                        {{ item.Price }}₮
                                    </p>
                                </div>
                            </td>
                            <td class="product-quantity">
                                <button @click="decreaseQuantity(index)">
                                    −
                                </button>
                                <input
                                    type="text"
                                    v-model="item.quantity"
                                    readonly />
                                <button @click="increaseQuantity(index)">
                                    +
                                </button>
                            </td>
                            <td class="product-price">
                                {{ item.Price.toFixed(2) }} ₮
                            </td>
                            <td>
                                <button
                                    class="remove-btn"
                                    @click="removeItem(index)">
                                    ✕
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex col flex-column">
                <h4 class="mt-4 mb-3">Хүргэлтийн хаяг</h4>
                <div class="d-flex flex-column justify-content-between h-100">
                    <div
                        class="d-flex loc-cont flex-wrap justify-content-between">
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
                        <button
                            class="btn-primary mt-4 col"
                            @click="saveLocation">
                            {{ locBtnText }}
                        </button>
                    </div>
                    <div v-if="locAddFormShow" class="d-flex flex-column gap-2">
                        <div
                            class="row-2 d-flex flex-row gap-3 mt-3 align-items-end">
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
                                    v-model="
                                        editedLocation.anotherPerson.f_name
                                    "
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
                                    v-model="
                                        editedLocation.anotherPerson.l_name
                                    "
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
                                    v-model="
                                        editedLocation.anotherPerson
                                            .phone_number
                                    "
                                    placeholder="Утасны дугаар оруулна уу"
                                    class="form-control custom-placeholder"
                                    :class="{
                                        'border-danger': error.phone_number,
                                    }"
                                    @input="limitPhoneNumber($event)" />
                            </div>
                        </div>
                        <div>
                            <div class="d-flex flex-column gap-1">
                                <div class="d-flex flex-row">
                                    <span class="text-danger">* </span>&nbsp;
                                    <p>Дэлгэрэнгүй мэдээлэл</p>
                                </div>
                                <textarea
                                    v-model="editedLocation.detail"
                                    placeholder="Та хаягаа зөв дэлгэрэнгүй, тодорхой оруулаагүйгээс үүдэн хүргэлт удаашрах, эсвэл хүргэгдэхгүй байж болзошгүйг анхаарна уу."
                                    class="form-control custom-placeholder"
                                    style="
                                        height: 74px;
                                        overflow-y: auto;
                                        resize: none;
                                    "
                                    maxlength="250"
                                    :class="{
                                        'border-danger': error.detail,
                                    }"
                                    @input="error.detail = false"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cart Table -->

        <!-- Summary Section -->
        <div class="cart-summary">
            <div class="summary-box">
                <!-- <p>
                    Delivery <span>${{ deliveryFee.toFixed(2) }}</span>
                </p> -->
            </div>
            <div class="summary-box">
                <p class="total">
                    Нийт төлбөр: <span> {{ total.toFixed(2) }}₮</span>
                </p>
            </div>
        </div>
        <!-- Buttons -->
        <div class="cart-buttons">
            <!-- <button class="back-btn">Back to Shop</button> -->
            <button class="checkout-btn">Үргэлжүүлэх</button>
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
    </div>
</template>

<script>
import locationItem from '@/components/locationItem.vue';
import { EventBus } from '@/Utils/eventBus';
import api from '@/services/api';

export default {
    name: 'CartPage',
    components: { locationItem },
    data() {
        return {
            cartItems: [],
            LocationItems: [],
            deliveryFee: 20.0,
            selectedId: null,
            selectedLocation: null,
            selectedOption: 'option1',
            locAddFormShow: false,
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

            locBtnText: 'Нэмэх',
            op: 1,
            error: {
                title: false,
                district: false,
                subdistrict: false,
                detail: false,
                f_name: false,
                l_name: false,
                phone_number: false,
            },
            removeModalVisible: false,
        };
    },
    async mounted() {
        this.loadCartItems();
        this.loadLocations();
    },
    computed: {
        subtotal() {
            return this.cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        },
        total() {
            return this.subtotal + this.deliveryFee;
        },
    },
    methods: {
        showModal(op, item) {
            if (op == 1) {
                console.log('removing location', item);
                this.removeModalVisible = true;
            }
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
        limitPhoneNumber(event) {
            this.error.phone_number = false;
            let value = event.target.value;
            if (value.length > 8) {
                value = value.slice(0, 8);
                event.target.value = value;
                this.editedLocation.anotherPerson.phone_number = value;
            }
        },

        increaseQuantity(index) {
            this.cartItems[index].quantity++;
            this.updateLocalStorage();
        },

        // Decrease quantity
        decreaseQuantity(index) {
            if (this.cartItems[index].quantity > 1) {
                this.cartItems[index].quantity--;
            } else {
                this.removeItem(index); // If quantity is 1, remove item
            }
            this.updateLocalStorage();
        },
        removeItem(index) {
            this.cartItems.splice(index, 1);
            this.updateLocalStorage();
        },

        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));

            // Emit updated cart to Navbar
            EventBus.$emit('cart-updated', this.cartItems);
        },
        toggle() {
            console.log('locAddFormShow', this.locAddFormShow);
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
        selectLocation(id) {
            this.selectedId = id;
            this.selectedLocation = this.LocationItems.find(
                (i) => i.LocationId === id
            );
            console.log('Selected location ID:', id);
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
        async saveLocation() {
            if (this.validate()) {
                if (this.op == 1) {
                    console.log('creating loc', this.editedLocation);

                    let data = {
                        UserId: 1,
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

                    try {
                        const res = await api.createLocation(data);
                        console.log('📦 Location created:', res);
                        // You can call this.loadLocations() or show a success toast here
                    } catch (err) {
                        console.error('❌ Failed to create location:', err);
                    }
                }

                if (this.op == 2) {
                    let data = {
                        UserId: 1,
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

                    try {
                        const res = await api.updateLocation(
                            this.editedLocation.id,
                            data
                        );
                        console.log('✅ Location updated:', res);
                    } catch (err) {
                        console.error('❌ Failed to update location:', err);
                    }
                }

                this.loadLocations();
                this.toggle();
            }
        },
        deleteLocationConfirm() {
            api.deleteLocation(this.selectedId).then(() => {
                this.removeModalVisible = false;
                this.loadLocations();
                if (this.locAddFormShow == true) {
                    this.toggle();
                }
            });
        },
        validate() {
            let err = true;
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
            // All fields are valid
            return err;
        },
        async loadLocations() {
            this.LocationItems = await api.getLocationsByUser(1);
            console.log('we fetched locs', this.LocationItems);
        },
        loadCartItems() {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            this.cartItems = storedCart.map((item) => ({
                ...item,
                quantity: item.quantity || 1, // Default to 1 if no quantity found
            }));
        },
    },
};
</script>

<style scoped>
/* Page Layout */
.cart-page {
    margin: 0 auto;
    padding: 20px 40px;
}

/* .cart-title {
    text-align: start;
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
} */

/* Cart Table */
.cart-table {
    width: 100%;
    border-collapse: collapse;
}
.cart-table thead {
    background-color: #eeeeee;
    /* background-color: green; */
}
.cart-table th {
    text-align: left;
    font-weight: bold;
    padding: 10px;

    color: gray;
}

.cart-table td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

.product-info {
    display: flex;
    align-items: center;
    gap: 10px;
}
.product-image-container {
    width: 50px;
    text-align: center;
}
.product-image {
    width: auto;
    height: 50px;
    border-radius: 5px;
}

.product-name {
    font-size: 14px;
    font-weight: bold;
}

.product-id {
    font-size: 12px;
    color: gray;
}

.product-size {
    text-align: center;
    font-size: 14px;
}

.product-quantity {
    /* display: flex; */
    flex-direction: row;
    text-align: center;
    gap: 5px;
}

.product-quantity button {
    border: none;
    background: #f0f0f0;
    padding: 5px 10px;
    cursor: pointer;
}

.product-quantity input {
    width: 30px;
    text-align: center;
    border: none;
    font-size: 14px;
    background: transparent;
}

.product-price {
    font-size: 14px;
    text-align: center;
    font-weight: bold;
}

.remove-btn {
    border: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
    color: gray;
    vertical-align: center;
}

/* Summary Section */
.cart-summary {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
}

.summary-box p {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}

.summary-box span {
    font-weight: bold;
}

.total {
    font-size: 16px;
    font-weight: bold;
}

/* Promo Code Section */
.promo-section {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.promo-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.apply-btn {
    background: #6c63ff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

/* Buttons */
.cart-buttons {
    display: flex;
    justify-content: end;
    margin-top: 20px;
}

.back-btn {
    background: black;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.checkout-btn {
    background: #6c63ff;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
.lil-icon {
    width: 16px;
    height: 16px;
}
.direction {
}
.add-icon {
    height: 8px;
    width: 8px;
}
.add-icon-container {
    display: flex;
    height: 16px;
    width: 16px;
    justify-content: center;
    align-items: center;
    border: 1px black solid;
    border-radius: 100px;
    margin-bottom: 10px;
}

.locItem-container {
    /* width: 200px; */
    min-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    justify-content: space-between;
    background-color: #eeeeee;
    border-radius: 12px;
    padding: 12px;
    flex: 1;
}
.locTitle {
    font-weight: 600;
    font-size: 14px;
    text-overflow: ellipsis;
}

.loc-cont {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.err-txt {
    color: red;
    align-self: flex-end; /* ✅ Aligns the small tag to the right */
    font-size: 12px;
    margin-top: 2px;
}

/deep/ input {
    font-family: var(--text-font);
}
.border-danger:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    outline: none;
}

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
</style>
