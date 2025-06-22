<template>
    <!-- <div class="d-flex jsutify-content-center align-items-center"> -->
    <div
        v-if="order"
        class="d-flex flex-column gap-4 align-items-center"
        style="max-width: 600px; margin: 0 auto">
        <div
            class="w-100"
            style="
                border: 1px solid black;
                border-radius: 16px;
                background-color: white;
            ">
            <div class="d-flex flex-row justify-content-between p-3">
                <p style="font-weight: 600">Төлбөрийн мэдээлэл</p>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <p>
                    {{
                        order.status == 1
                            ? 'Төлбөр төлөгдсөн.'
                            : 'Төлбөр хүлээгдэж байна.'
                    }}
                </p>
            </div>

            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <button class="btn-secondar">Захиалга цуцлах</button>
                <button class="btn-primary">Төлбөр төлөх</button>
            </div>
        </div>

        <div
            class="w-100"
            style="
                border: 1px solid black;
                border-radius: 16px;
                background-color: white;
            ">
            <div class="d-flex flex-row justify-content-between p-3">
                <p style="font-weight: 600">Бүтээгдэхүүн</p>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-column gap-3">
                <div
                    class="d-flex flex-row gap-3 align-items-center justify-content-between"
                    v-for="(prod, index) in order.productImages"
                    :key="index">
                    <div class="gap-2 d-flex flex-row align-items-center">
                        <div class="img-wrapper">
                            <img
                                :src="prod.img"
                                class="product-img"
                                alt="product" />
                        </div>
                        <p>{{ prod.name }}</p>
                    </div>
                    <div class="gap-2 d-flex flex-row align-items-center">
                        <p>{{ prod.price }}₮</p>
                        <p style="padding: 3px 9px; border-radius: 4px">
                            x{{ prod.quantity }}
                        </p>
                        <p style="font-weight: 500">{{ prod.total }}₮</p>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="w-100"
            style="
                border: 1px solid black;
                border-radius: 16px;
                background-color: white;
            ">
            <div class="d-flex flex-row justify-content-between p-3">
                <div>
                    <p style="font-size: 13px; color: grey">Захиалгын дугаар</p>
                    <p style="font-weight: 600">{{ order.id }}</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">
                        Захиалга хийсэн огноо
                    </p>
                    <p style="font-weight: 600; text-align: end">
                        {{ order.date }}
                    </p>
                </div>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3">
                <div class="d-flex flex-row justify-content-between">
                    <p>Захиалгын төлбөр</p>
                    <p>{{ order.total }}₮</p>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <p>Хүргэлтийн төлбөр</p>
                    <p>2000₮</p>
                </div>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <p style="font-weight: 600">Нийт үнэ</p>
                <p style="font-weight: 600">{{ order.total }}₮</p>
            </div>
        </div>

        <div
            class="w-100"
            style="
                border: 1px solid black;
                border-radius: 16px;
                background-color: white;
            ">
            <div class="d-flex flex-row justify-content-between p-3">
                <p style="font-weight: 600">Захиалагчийн мэдээлэл</p>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <div>
                    <p style="font-size: 13px; color: grey">Таны овог</p>
                    <p style="font-weight: 500">Davaadavga</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">Таны нэр</p>
                    <p style="font-weight: 500">Adiyabazar</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">Утасны дугаар</p>
                    <p style="font-weight: 500">90201310</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">Цахим хаяг</p>
                    <p style="font-weight: 500">msn.njr11006@gmail.com</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">Хувь хүн</p>
                    <p style="font-weight: 500">-</p>
                </div>
            </div>
        </div>

        <div
            class="w-100"
            style="
                border: 1px solid black;
                border-radius: 16px;
                background-color: white;
            ">
            <div class="d-flex flex-row justify-content-between p-3">
                <p style="font-weight: 600">Хүргэлтийн хаяг</p>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-column gap-2">
                <div class="d-flex flex-row justify-content-between">
                    <div>
                        <p style="font-size: 13px; color: grey">
                            Хаяг: {{ order.l_Title }}
                        </p>
                        <p style="font-weight: 500">
                            {{ order.l_Hot }}, {{ order.l_Duureg }},
                            {{ order.l_Horoo }}
                        </p>
                    </div>
                    <div>
                        <p style="font-size: 13px; color: grey">
                            Өөр хүн хүлээж авах
                        </p>
                        <p style="font-weight: 500">
                            {{ order.isAnotherPerson == 1 ? 'Тийм' : 'Үгүй' }}
                        </p>
                    </div>
                    <div>
                        <p style="font-size: 13px; color: grey">
                            Дэлгэрэнгүй мэдээлэл
                        </p>
                        <p style="font-weight: 500">{{ order.l_Detail }}</p>
                    </div>
                </div>
                <div
                    v-if="order.isAnotherPerson == 1"
                    class="d-flex flex-row justify-content-between">
                    <div>
                        <p style="font-size: 13px; color: grey">Нэр</p>
                        <p style="font-weight: 500">
                            {{ order.l_f_name }}
                        </p>
                    </div>
                    <div>
                        <p style="font-size: 13px; color: grey">Овог</p>
                        <p style="font-weight: 500">
                            {{ order.l_l_name }}
                        </p>
                    </div>
                    <div>
                        <p style="font-size: 13px; color: grey">
                            Утасны дугаар
                        </p>
                        <p style="font-weight: 500">
                            {{ order.l_phone_number }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import api from '@/services/api';
import { getData } from '@/Utils/LocalStorage';

export default {
    name: 'ConfirmationPage',
    computed: {},
    data() {
        return {
            userData: null,
            order: null,
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.userData = getData('userData');

            if (this.userData) {
                let orderid = getData('selectedOrder');
                console.log(this.userData.id, parseInt(orderid));
                let data = await api.getOrdersByUserAndProduct(
                    this.userData.id,
                    parseInt(orderid)
                );
                this.order = data[0];
                console.log('we got dat in confirm - ', data);
            } else {
                this.$router.push({
                    name: 'Login',
                });
            }
        },
    },
};
</script>

<style scoped>
.img-wrapper {
    position: relative;
    width: 40px;
    height: 40px;
}

.product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ccc;
}
</style>
