<template>
    <div class="cart-page">
        <div class="d-flex flex-row gap-3 align-items-center">
            <p class="direction" style="color: orange">Миний сагс</p>
            <!-- <img
                :src="require('@/assets/svgicons/next.svg')"
                class="lil-icon"
                alt="next icon" /> -->
            <!-- <p class="direction">Захиалгын хаяг</p> -->
            <img
                :src="require('@/assets/svgicons/next.svg')"
                class="lil-icon"
                alt="next icon" />
            <p class="direction">Баталгаажуулах</p>
        </div>

        <div class="d-flex flex-row gap-4 flex-wrap">
            <div class="d-flex col flex-column">
                <h4 class="mt-4 mb-3">Миний сагс</h4>
                <div
                    v-if="this.cartItems.length > 0"
                    class="d-flex flex-column gap-4">
                    <div
                        class="d-flex flex-row align-items-center w-100 gap-2"
                        v-for="(item, index) in cartItems"
                        :key="index">
                        <div>
                            <input
                                type="checkbox"
                                :checked="
                                    selectedCartItems.includes(item.ProductId)
                                "
                                @change="cartItemChanging(item.ProductId)"
                                class="checkbox" />
                        </div>
                        <div
                            class="d-flex flex-row align-items-center justify-content-between w-100 cart-item"
                            :class="{
                                selected: selectedCartItems.includes(
                                    item.ProductId
                                ),
                            }"
                            @click="cartItemChanging(item.ProductId)">
                            <div class="d-flex flex-row gap-3">
                                <div class="product-image-container">
                                    <img
                                        :src="item.ImageUrl"
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
                            </div>
                            <div
                                class="col-5 d-flex flex-row align-items-center justify-content-between">
                                <div class="product-quantity">
                                    <button
                                        style="background-color: transparent"
                                        @click.stop="decreaseQuantity(index)">
                                        −
                                    </button>
                                    <input
                                        type="text"
                                        v-model="item.quantity"
                                        readonly />
                                    <button
                                        style="background-color: transparent"
                                        @click.stop="increaseQuantity(index)">
                                        +
                                    </button>
                                </div>
                                <div class="product-price">
                                    {{ item.Price.toFixed(2) }} ₮
                                </div>
                                <div>
                                    <button
                                        class="remove-btn"
                                        @click.stop="removeItem(index)">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="d-flex flex-column align-items-center justify-content-center gap-2"
                    style="height: 200px">
                    <img
                        style="height: 50px"
                        :src="require('@/assets/svgicons/box.svg')"
                        alt="empty icon" />
                    <p>Таны сагс хоосон байна.</p>
                </div>
                <!-- <table class="cart-table" v-if="this.cartItems.length > 0">
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
                </table> -->

                <h4 class="mt-4 mb-3">Захиалагчийн мэдээлэл</h4>
                <div class="d-flex flex-row flex-wrap w-100 gap-3">
                    <div class="row-2 d-flex flex-row gap-3 align-items-end">
                        <div class="d-flex flex-column gap-1 w-100">
                            <div class="d-flex flex-row">
                                <span class="text-danger">* </span>&nbsp;
                                <p>Нэр</p>
                            </div>
                            <input
                                type="text"
                                v-model="customerInfo.f_name"
                                placeholder="Нэр"
                                class="form-control custom-placeholder"
                                :class="{
                                    'border-danger': customerError.f_name,
                                }"
                                maxlength="100"
                                @input="customerError.f_name = false" />
                        </div>
                        <div class="d-flex flex-column gap-1 w-100">
                            <div class="d-flex flex-row">
                                <span class="text-danger">* </span>&nbsp;
                                <p>Овог</p>
                            </div>
                            <input
                                type="text"
                                v-model="customerInfo.l_name"
                                placeholder="Овог"
                                class="form-control custom-placeholder"
                                :class="{
                                    'border-danger': customerError.l_name,
                                }"
                                @input="customerError.l_name = false"
                                maxlength="50" />
                        </div>
                        <div class="d-flex flex-column gap-1 w-100">
                            <div class="d-flex flex-row">
                                <span class="text-danger">* </span>&nbsp;
                                <p>Утасны дугаар</p>
                            </div>
                            <input
                                type="text"
                                v-model="customerInfo.phone_number"
                                placeholder="Утасны дугаар"
                                class="form-control custom-placeholder"
                                :class="{
                                    'border-danger': customerError.phone_number,
                                }"
                                @input="customerError.phone_number = false"
                                maxlength="50" />
                        </div>
                    </div>
                </div>

                <h4 class="mt-4 mb-3">Баримт</h4>
                <div>
                    <label class="custom-radio">
                        <input
                            type="radio"
                            value="1"
                            v-model="selectedType"
                            :class="{ 'border-danger': barimtError.choose }"
                            @input="barimtError.choose = false" />
                        <span
                            :class="{
                                'radio-check': true,
                                error: barimtError.choose,
                            }"></span>
                        Хувь хүн
                    </label>

                    <label class="custom-radio" style="margin-left: 20px">
                        <input
                            type="radio"
                            value="2"
                            v-model="selectedType"
                            :class="{ 'border-danger': barimtError.choose }"
                            @input="barimtError.choose = false" />
                        <span
                            :class="{
                                'radio-check': true,
                                error: barimtError.choose,
                            }"></span>
                        Байгууллага
                    </label>
                </div>
                <div
                    v-if="selectedType == '2'"
                    class="row-2 d-flex flex-row gap-3 align-items-end mt-3">
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;
                            <p>Регистерийн дугаар</p>
                        </div>
                        <input
                            type="text"
                            v-model="register"
                            placeholder="Регистерийн дугаар"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': barimtError.register,
                            }"
                            maxlength="100"
                            @input="barimtError.register = false" />
                    </div>
                    <div class="d-flex flex-column gap-1 w-100">
                        <div class="d-flex flex-row">
                            <span class="text-danger">* </span>&nbsp;
                            <p>Байгууллагын нэр</p>
                        </div>
                        <input
                            type="text"
                            v-model="orgName"
                            placeholder="Байгууллагын нэр"
                            class="form-control custom-placeholder"
                            :class="{
                                'border-danger': barimtError.orgName,
                            }"
                            @input="barimtError.orgName = false"
                            maxlength="50" />
                    </div>
                </div>
                <!-- <h4 class="mt-4 mb-3">Төлбөрийн төрөл</h4>
                <div class="bank-grid">
                    <BankItem
                        v-for="bank in banks"
                        :key="bank.id"
                        :bank-id="bank.id"
                        :title="bank.title"
                        :description="bank.description"
                        :image="bank.image"
                        :selected-id="selectedBankId"
                        @select="selectedBankId = $event" />
                </div> -->
            </div>
            <div class="d-flex col flex-column">
                <h4 class="mt-4 mb-3">Хүргэлтийн хаяг</h4>
                <div class="d-flex flex-column h-100">
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
                    Нийт төлбөр :
                    <span> {{ totalPrice.toLocaleString() }}₮</span>
                </p>
            </div>
        </div>

        <!-- Buttons -->
        <div class="cart-buttons">
            <!-- <button class="back-btn">Back to Shop</button> -->
            <button class="checkout-btn" @click="confirm">Үргэлжлүүлэх</button>
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
import locationItem from '@/components/locationItem.vue';
// import BankItem from '@/components/banktem.vue';
import { EventBus } from '@/Utils/eventBus';
import api from '@/services/api';
import { getData, setData } from '@/Utils/LocalStorage';
import alertModal from '@/components/alertModal.vue';
export default {
    name: 'CartPage',
    components: { locationItem, alertModal },
    data() {
        return {
            cartItems: [],
            LocationItems: [],
            selectedCartItems: [],
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
            customerInfo: {
                f_name: '',
                l_name: '',
                phone_number: null,
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
            customerError: {
                f_name: false,
                l_name: false,
                phone_number: false,
                email: false,
            },
            removeModalVisible: false,
            selectedBankId: null,
            banks: [
                {
                    id: 1,
                    title: 'Social Pay',
                    description: 'Social pay ашиглан төлөх',
                    image: require('@/assets/banks/socialpay.png'),
                },
                {
                    id: 2,
                    title: 'Monpay',
                    description: 'апп-р төлөх',
                    image: require('@/assets/banks/monpay.png'),
                },
                {
                    id: 3,
                    title: 'KhanBank',
                    description: 'апп-р төлөх',
                    image: require('@/assets/banks/khan.png'),
                },
                {
                    id: 4,
                    title: 'hiPay',
                    description: 'апп-р төлөх',
                    image: require('@/assets/banks/hipay.png'),
                },
                {
                    id: 5,
                    title: 'Mbank',
                    description: 'апп-р төлөх',
                    image: require('@/assets/banks/mbank.png'),
                },
            ],
            userData: null,

            message: '',
            title: 'Хувийн мэдээлэл засах',
            alertType: 'success',
            showAlert: false,
            newOrderId: null,
            selectedType: null,
            register: null,
            orgName: null,
            barimtError: {
                register: false,
                orgName: false,
                choose: false,
            },
        };
    },
    async mounted() {
        this.userData = await getData('userData');
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
        totalPrice() {
            return this.cartItems.reduce(
                (sum, item) => sum + item.Price * item.quantity,
                0
            );
        },
    },
    methods: {
        async confirm() {
            if (this.validate(2)) {
                console.log('confirming');
                console.log(this.selectedCartItems);
                console.log(this.cartItems);
                console.log(this.selectedBankId);
                let products = [];
                this.cartItems.forEach((cart) => {
                    this.selectedCartItems.forEach((sel) => {
                        if (cart.ProductId == sel) {
                            products.push({
                                productId: sel,
                                Quantity: cart.quantity,
                            });
                        }
                    });
                });
                let order = {
                    UserId: this.userData.id,
                    // PaymentType: this.selectedBankId,
                    LocationId: this.selectedLocation.LocationId,
                    fname: this.customerInfo.f_name,
                    lname: this.customerInfo.l_name,
                    phone: this.customerInfo.phone_number,
                    barimt: this.selectedType,
                    register: this.register == '' && 'null',
                    orgName: this.orgName == '' && 'null',
                    isPaid: false,
                    products: products,
                };

                // localStorage.setItem('pendingOrder', JSON.stringify(order));

                try {
                    const result = await api.createOrder(order);
                    this.newOrderId = result.OrderId;
                    console.log('result: ', result);
                    setData('selectedOrder', this.newOrderId);
                    localStorage.removeItem('cart');
                    EventBus.$emit('cart-updated', []);
                    this.cartItems = [];
                    this.message = 'Амжилттай захиалга амжилттай үүслээ.';
                    this.alertType = 'success';
                    this.showAlert = true;
                } catch (error) {
                    this.message = 'Алдаа гарлаа. Дахин оролдоно уу.';
                    this.alertType = 'error';
                    this.showAlert = true;
                }
            } else {
                console.log('error');
            }
        },
        cartItemChanging(id) {
            const index = this.selectedCartItems.indexOf(id);
            if (index !== -1) {
                // Remove item
                this.selectedCartItems.splice(index, 1);
            } else {
                // Add item
                this.selectedCartItems.push(id);
            }
        },
        showModal(op) {
            if (op == 1) {
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
            console.log(this.cartItems[index]);
            if (
                this.cartItems[index].maxQuantity >=
                this.cartItems[index].quantity + 1
            ) {
                this.cartItems[index].quantity++;
                this.updateLocalStorage();
            }
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
            if (op == 2) {
                if (this.cartItems.length == 0) {
                    err = false;
                    this.$toast.error('Сагс хоосон байна.');
                } else {
                    if (this.selectedCartItems.length == 0) {
                        err = false;
                        this.$toast.error('Бүтээгдэхүүн сонгоно уу.');
                    } else {
                        const fname = this.customerInfo.f_name.trim();
                        const lname = this.customerInfo.l_name.trim();
                        if (this.selectedType == '2') {
                            const register = this.register.trim();
                            const org = this.orgName.trim();
                            if (!register) {
                                this.barimtError.register = true;
                                err = false;
                            }
                            if (!org) {
                                this.barimtError.orgName = true;
                                err = false;
                            }
                        }
                        if (!fname) {
                            this.customerError.f_name = true;
                            err = false;
                        }
                        if (!lname) {
                            this.customerError.l_name = true;
                            err = false;
                        }

                        const p = this.customerInfo.phone_number;
                        if (!p || p.toString().length !== 8) {
                            this.customerError.phone_number = true;
                            err = false;
                        }
                        if (this.selectedType == null) {
                            this.barimtError.choose = true;
                            err = false;
                        }
                        // if (this.selectedBankId == null) {
                        //     console.log('bank song');
                        //     err = false;
                        // }
                    }
                }
            }
            // All fields are valid
            return err;
        },
        async loadLocations() {
            this.LocationItems = await api.getLocationsByUser(this.userData.id);
        },
        loadCartItems() {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            this.cartItems = storedCart.map((item) => ({
                ...item,
                quantity: item.quantity || 1, // Default to 1 if no quantity found
            }));
        },

        handleClose() {
            if (this.alertType === 'success') {
                this.$router.push({
                    name: 'Confirmation',
                });
            }
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
    font-family: var(--text-font);
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
.custom-radio {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.custom-radio input[type='radio'] {
    display: none;
}

.radio-check {
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 8px;
    position: relative;
    transition: border 0.2s;
}

input[type='radio']:checked + .radio-check::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 3px;
    left: 3px;
    background-color: #007bff;
    border-radius: 50%;
}

.radio-check.error {
    border-color: #dc3545; /* Bootstrap's red */
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
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
.bank-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.bank-grid ::v-deep .bank-item {
    flex: 1 1 calc(50% - 8px); /* 2 items per row with 16px gap */
    box-sizing: border-box;
}
.cart-item {
    background-color: white;
    border-radius: 12px;
    padding: 12px;
    border: 2px solid transparent;
    transition: 0.2s;
}

.cart-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.cart-item.selected {
    background-color: #f0f8ff;
    border-color: #007bff;
}
</style>
