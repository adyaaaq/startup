<template>
    <div class="d-flex flex-column gap-4">
        <div style="border: 1px solid black; border-radius: 16px">
            <div class="d-flex flex-row justify-content-between p-3">
                <div>
                    <p style="font-size: 13px; color: grey">Захиалгын дугаар</p>
                    <p style="font-weight: 600">1</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">
                        Захиалга хийсэн огноо
                    </p>
                    <p style="font-weight: 600; text-align: end">
                        2025/05/24 05:12
                    </p>
                </div>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3">
                <div class="d-flex flex-row justify-content-between">
                    <p>Захиалгын төлбөр</p>
                    <p>2000₮</p>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <p>Хүргэлтийн төлбөр</p>
                    <p>2000₮</p>
                </div>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <p style="font-weight: 600">Нийт үнэ</p>
                <p style="font-weight: 600">4000₮</p>
            </div>
        </div>

        <div style="border: 1px solid black; border-radius: 16px">
            <div class="d-flex flex-row justify-content-between p-3">
                <p style="font-weight: 600">Бүтээгдэхүүн</p>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <div>
                    <div>
                        <p>Onion The Draft</p>
                    </div>
                </div>
                <div class="d-flex flex-row gap-3 align-items-center">
                    <p>5000₮</p>
                    <p
                        style="
                            background-color: gray;
                            padding: 3px 9px;
                            border-radius: 4px;
                        ">
                        x1
                    </p>
                    <p style="font-weight: 500">5000₮</p>
                </div>
            </div>
        </div>

        <div style="border: 1px solid black; border-radius: 16px">
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

        <div style="border: 1px solid black; border-radius: 16px">
            <div class="d-flex flex-row justify-content-between p-3">
                <p style="font-weight: 600">Очиж авах</p>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <div>
                    <p style="font-size: 13px; color: grey">Очиж авах огноо</p>
                    <p style="font-weight: 500">Davaadavga</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">Очиж авах цаг</p>
                    <p style="font-weight: 500">Adiyabazar</p>
                </div>
                <div>
                    <p style="font-size: 13px; color: grey">Очиж авах хаяг</p>
                    <p style="font-weight: 500">90201310</p>
                </div>
            </div>
        </div>

        <div style="border: 1px solid black; border-radius: 16px">
            <div class="d-flex flex-row justify-content-between p-3">
                <p style="font-weight: 600">Төлбөрийн мэдээлэл</p>
            </div>
            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <p>Төлбөр хүлээгдэж байна...</p>
            </div>

            <div style="background-color: black; height: 1px"></div>
            <div class="p-3 d-flex flex-row justify-content-between">
                <button class="btn-secondar">Захиалга цуцлах</button>
                <button class="btn-primary">Төлбөр төлөх</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmationPage',
    props: ['order'],
    computed: {},
    mounted() {
        const order = JSON.parse(localStorage.getItem('pendingOrder'));
        console.log(order);
    },
};
</script>

<style scoped></style>
