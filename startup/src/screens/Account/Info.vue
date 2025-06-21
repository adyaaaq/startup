<template>
    <div>
        <div class="tabs">
            <div
                v-for="(tab, index) in tabs"
                :key="index"
                class="tab"
                :class="{ active: activeTab === index }"
                @click="activeTab = index">
                <img
                    :src="require(`@/assets/svgicons/${tab.icon}`)"
                    :alt="tab.label" />
                <div class="d-flex flex-column gap-1">
                    <span class="tab-title">{{ tab.label }}</span>
                    <small class="tab-sub">{{ tab.subtitle }}</small>
                </div>
            </div>
        </div>

        <div class="tab-content">
            <component
                v-if="isReady"
                :is="tabs[activeTab].component"
                :user-data="userData"
                :update="updateUserData" />
        </div>
    </div>
</template>

<script>
import AddressInfo from './comps/AddressInfo.vue';
import EmailInfo from './comps/EmailInfo.vue';
import PersonalInfo from './comps/PersonalInfo.vue';
import PasswordInfo from './comps/PasswordInfo.vue';
import PhoneInfo from './comps/PhoneInfo.vue';

import { getData } from '@/Utils/LocalStorage';

export default {
    name: 'Info',
    components: {
        PersonalInfo,
        PhoneInfo,
        EmailInfo,
        PasswordInfo,
        AddressInfo,
    },
    data() {
        return {
            activeTab: 0,
            tabs: [
                {
                    label: 'Хувийн мэдээлэл',
                    subtitle: 'Adiyabazar',
                    icon: 'user.svg',
                    component: 'PersonalInfo',
                },
                {
                    label: 'Утасны дугаар',
                    subtitle: 'Баталгаажсан',
                    icon: 'phone.svg',
                    component: 'PhoneInfo',
                },
                {
                    label: 'Цахим хаяг',
                    subtitle: 'Баталгаажсан',
                    icon: 'email.svg',
                    component: 'EmailInfo',
                },
                {
                    label: 'Нууц үг',
                    subtitle: 'Шинэчлэх',
                    icon: 'lock.svg',
                    component: 'PasswordInfo',
                },
                {
                    label: 'Delivery address',
                    subtitle: 'Шинэчлэх',
                    icon: 'map-pin.svg',
                    component: 'AddressInfo',
                },
            ],
            userData: null,
            isReady: false,
        };
    },
    mounted() {
        this.userData = getData('userData');
        this.tabs[0].subtitle = this.userData.fname;
        console.log('user data in infoooo: ', this.userData);
        this.isReady = true; // ✅ only allow rendering after this
    },
    methods: {
        updateUserData() {
            this.userData = getData('userData');
        },
    },
};
</script>

<style scoped>
.profile-edit {
    font-family: 'Segoe UI', sans-serif;
    padding: 20px 40px;
    max-width: 900px;
    margin: auto;
    background-color: #fff;
}

.tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 32px;
}

.tab {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    min-width: 160px;
}

.tab.active {
    background-color: #f3f3f3;
    border-color: transparent;
}

.tab img {
    width: 24px;
    height: 24px;
}

.tab-title {
    font-weight: bold;
    font-size: 14px;
}

.tab-sub {
    font-size: 12px;
    color: #666;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

label {
    font-weight: 500;
    margin-bottom: 4px;
    font-size: 14px;
}

input,
select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    width: 100%;
}

.birthdate {
    display: flex;
    gap: 12px;
}

.save-btn {
    width: fit-content;
    background-color: #000;
    color: #fff;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 20px;
}

.save-btn:hover {
    background-color: #333;
}
</style>
