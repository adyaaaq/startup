<template>
    <div id="body-pd">
        <NavBar v-if="!isAdminRoute" />
        <div v-if="!isAdminRoute" class="content-body">
            <div class="content-section">
                <div class="content-container">
                    <transition name="moveInUp">
                        <router-view />
                    </transition>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="content-container">
                <transition name="moveInUp">
                    <router-view />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import NavBar from './components/NavBar.vue';
// import AdminLayout from './screens/Layout/AdminLayout.vue';
export default {
    name: 'App',
    components: {
        NavBar,
        // AdminLayout,
        // HelloWorld,
    },
    computed: {
        isAdminRoute() {
            return this.$route.path.startsWith('/admin');
        },
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

#confirm-div {
    display: none !important;
}
#modal-xl-bigsize .modal-dialog {
    max-width: 80% !important;
}
:root {
    --body-font: 'Open Sans', sans-serif;
    --text-font: 'montserrat';
    --header-height: 56px;
    --nav-width: 66px;
    --bs-font-size: 14px;
    --small-font-size: 12px;
    --big-font-size: 20px;
    --bs-line-height: 20px;
    --z-fixed: 100;
    --bs-padding: 24px;
    --sched-padding: 2px;
    --text-color: #0b111a;
    --white-color: #fff;
    --primary-color: #003e96;
    --teams-color: #3f46ac;
    --secondary-color: #fec24e;
    --secondary-text: rgba(22, 33, 51, 0.5);
    --text-p-color: #6d7075;
    --text-h4-color: #30343c;
    --line-color: #eaecec;
    --border-color: #c9d1d9;
    --disable: #d0d2d7;
    --bg: #eef8ff;
    --input-border: #c9d1d9;
    --grad-bg: linear-gradient(
        111.32deg,
        rgba(130, 194, 254, 0.2) 12.89%,
        rgba(49, 127, 245, 0.2) 100%
    );
    --primary-1: #0049b0;
    --primary-1-hover: #e0eafd;
    --default-btn: linear-gradient(180deg, #fff 0%, #f3f5f7 100%);
    --btn-text: rgba(22, 33, 51, 0.8);
    --primary-bg: #125cec21;
    --teams-bg: #777ee3;
    --gray-bg: #e9ecef;
    --gray: rgba(227, 231, 235, 0.9);
    --primary-filter: invert(14%) sepia(96%) saturate(6001%) hue-rotate(220deg)
        brightness(94%) contrast(87%);
    --white-filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(325deg)
        brightness(107%) contrast(102%);
    --gray-filter: invert(29%) sepia(30%) saturate(400%) hue-rotate(181deg)
        brightness(89%) contrast(90%);
    --bg-body-color: #f0f1f2;
    --link: #286cef;
    --req-field-bg: #d9e9ff;
    background-color: #eeeeee;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-thumb {
    background: #c1c9d2;
    border-radius: 5px;
}
html {
    height: 100vh;
}

body {
    /* position: relative;*/
    /* margin: 0 !important; */

    font-family: var(--text-font);
    transition: 0.5s;
    /* padding-left: var(--nav-width); */
    min-height: calc(100% - var(--header-height) - 1px);
    font-family: var(--text-font);
    font-size: calc(var(--bs-font-size) + 1px);
    color: var(--text-color);
    text-align: left;
    letter-spacing: normal;
    margin: 0px;
    background-color: #f6f6f6 !important;
}

.empty {
    text-align: center;
    /*margin-top: calc(45% - 100px);*/
    margin-top: var(--bs-padding);
}

.empty img {
    width: 3rem;
    height: 3rem;
}

.empty small {
    color: var(--disable);
}

.empty .top_menu_text,
.top-menu .empty .main_text {
    display: none;
}

.top-menu .empty .top_menu_text,
.empty .main_text {
    display: block;
}

.empty-text {
    color: var(--text-p-color);
    --font-style: italic;
    font-size: calc(var(--bs-font-size) - 1px);
}

/*** tags ***/
h1 {
    color: var(--text-color);
    font-weight: bold;
    font-family: var(--text-font);
    font-size: calc(var(--bs-font-size) + 22px);
    line-height: calc(var(--bs-line-height) + 28px);
}

h2 {
    color: var(--text-color);
    font-weight: bold;
    font-family: var(--text-font);
    font-size: calc(var(--bs-font-size) + 16px);
    line-height: calc(var(--bs-line-height) + 20px);
}

h3 {
    color: var(--text-color);
    font-weight: bold;
    font-family: var(--text-font);
    font-size: calc(var(--bs-font-size) + 7px);
    line-height: calc(var(--bs-line-height) + 12px);
    margin-bottom: var(--bs-padding);
}

h4 {
    color: var(--text-color);
    font-weight: bold;
    font-family: var(--text-font);
    font-size: calc(var(--bs-font-size) + 2px);
    line-height: calc(var(--bs-line-height) + 6px);
}

h5 {
    color: var(--text-color);
    font-weight: 600;
    font-family: var(--text-font);
    font-size: var(--bs-font-size);
    line-height: var(--bs-line-height);
}

h6 {
    color: var(--text-p-color);
    font-weight: 600;
    font-family: var(--text-font);
    font-size: calc(var(--bs-font-size) - 2px);
    line-height: calc(var(--bs-line-height) - 4px);
}

p {
    color: var(--text-color);
    font-weight: normal;
    font-size: var(--bs-font-size);
    line-height: var(--bs-line-height);
    margin-bottom: 0 !important;
    font-family: var(--text-font);
}

small {
    color: var(--text-p-color);
    font-weight: normal;
    font-size: calc(var(--bs-font-size) - 2px);
    line-height: calc(var(--bs-line-height) - 3px);
}

a {
    text-decoration: none !important;
}

.small {
    font-size: calc(var(--bs-font-size) - 1px);
    line-height: calc(var(--bs-line-height) - 1px);
}

.btn {
    font-size: calc(var(--bs-font-size) - 2px);
    line-height: calc(var(--bs-line-height) - 4px);
    border: none;
}

button svg.bi-chevron-right path {
    fill: currentColor;
}

.course .btn-primary {
    float: right;
}

/* don't add padding (It will change the datepicker) */
.btn-primary {
    font-family: var(--text-font);
    border-radius: 4px;
    background-color: var(--primary-1);
    color: #fff;
    font-size: var(--bs-font-size);
    border: 1px solid var(--primary-1);
}

.btn-primary:hover {
    color: #fff;
    background: #013b8c;
}

.btn-primary img {
    width: 16px;
    height: 16px;
    filter: var(--primary-filter);
}

.btn-primary:hover img {
    filter: var(--white-filter);
}

.btn-primary.disabled,
.btn-primary:disabled {
    background: var(--primary-1);
    opacity: 0.6;
}
.btn-secondar {
    font-family: var(--text-font);
    border-radius: 4px;
    border: 1px solid var(--input-border);
    background: var(--default-btn);
    padding: 8px 12px;
    color: var(--btn-text);
    font-size: var(--bs-font-size);
}

.btn-secondar:hover {
    background: #ebedf0;
}

.btn-secondar.file {
    border-radius: 4px;
    border: 0;
    border-left: 1px solid var(--input-border);
    background: var(--default-btn);
    padding: 8px 12px;
    color: var(--btn-text);
    font-size: var(--bs-font-size);
}
.btn-secondar.file:hover {
    background: #ebedf0;
}

.btn-secondar img {
    width: 16px;
    height: 16px;
    filter: var(--white-filter);
}

.btn-teams {
    border: 1px solid rgba(102, 0, 204, 0.3);
    background: rgba(102, 0, 204, 0.2);
    color: #4d0099;
    font-size: calc(var(--bs-font-size));
}

.search-input-group {
    margin-bottom: 24px;
    width: 334px;
    font-size: 12px;
}

.btn.search-btn {
    background-color: var(--primary-1);
    opacity: 1;
}

.page-item.active button.page-link {
    background-color: var(--primary-1);
    border-color: var(--primary-1);
}

.content-body {
    padding: var(--bs-padding);
}

.content-section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.content-container {
    width: 100%;
    max-width: 1600px;
}

.footer p {
    font-size: 12px;
    text-align: center;
}

.card-text-guide {
    color: var(--text-color);
    background-color: var(--req-field-bg);
    padding: 16px;
    border-radius: 4px;
    font-size: calc(var(--bs-font-size)-1px);
    line-height: var(--bs-line-height);
}

.body-pd {
    padding-left: calc(var(--nav-width));
}
.table td,
.table th {
    border-color: var(--border-color);
}

table thead.greyhead {
    background-color: var(--gray);
    font-size: var(--bs-font-size);
    font-weight: 600;
    line-height: 19.5px;
}

table thead.greyhead th {
    vertical-align: top;
    text-align: center;
}

/* .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(var(--nav-width) + 188px);
  z-index: 100;
  transition: all 0.5s ease;
  background-color: var(--primary-color);
} */

/* mobile css */
.left-btn-header-mobile {
    position: fixed;
    z-index: 1;
    padding-left: 20px;
    top: 13px;
}

.portrait {
    margin: 1rem 0 0 1rem;
    /* position: relative; */
    width: 80px;
    height: 100px;
    border-radius: 4px;
    justify-content: flex-start;
    display: inline-block;
    overflow: hidden;
    float: left;
}

.portrait img {
    width: 100%;
    height: auto;
    border: 0;
}

.portrait hr {
    transform: rotate(90deg);
    margin: auto;
    opacity: 0;
    color: var(--line-color);
    background-color: var(--line-color);
}

.alert-gray {
    background-color: var(--gray-bg);
    padding: calc(var(--bs-padding) - 0.5rem);
    font-size: calc(var(--bs-font-size) - 1px);
    line-height: calc(var(--bs-line-height) - 1px);
    border-radius: 5px;
}

.alert-gray img {
    /*color: #FEC24E;*/
    filter: invert(82%) sepia(73%) saturate(835%) hue-rotate(319deg)
        brightness(103%) contrast(99%);
    margin-top: -4px;
    width: 20px;
    height: 20px;
}

.alert-gray.list svg {
    color: var(--text-color);
    margin-top: -4px;
    width: 24px;
    height: 24px;
    padding: 3px;
    border-radius: 50%;
    border: 1px solid #fff;
}

.alert-gray b {
    font-weight: 600;
    color: var(--text-h4-color);
}

/*Tab*/
.my-tabs {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--line-color);
    width: 100%;
}

.my-tabs .tab-name {
    margin-bottom: 16px;

    padding: 0 1px;
}

/* .my-tabs .tab-name:hover + .line {
                visibility: visible;
                opacity: .5;
            } */
.my-tabs .tab-name:hover span,
.my-tabs .tab-name:hover h5 {
    color: var(--primary-color);
    cursor: pointer;
}

.my-tabs .line {
    width: 100%;
    background-color: var(--primary-color);
    border-radius: 1px;
    height: 2px;
    bottom: 0;
    visibility: hidden;
}

.my-tabs .line-sub {
    background-color: var(--text-color);
}

.my-tabs .active .line {
    visibility: visible;
}
span {
    font-family: var(--text-font);
}
.my-tabs .active span {
    color: var(--primary-color);
    font-family: var(--text-font);
    font-weight: 600;
}

.my-tabs .active .mx-3 {
    color: var(--primary-color);
}

.my-tabs-sub .active span {
    font-family: var(--text-font);
    color: var(--text-color);
    font-weight: 600;
}

.nav_list .fill,
.nav_list .router-link-exact-active .line {
    display: none;
}

.nav_link .line img {
    filter: var(--gray-filter);
}

.nav_link:hover .line img {
    filter: var(--primary-filter);
}

.nav_link .fill img,
.nav_link .line img {
    height: 20px;
    width: 20px;
    font-size: 0 !important;
}

.navigation-bar {
    position: fixed;
    right: 0;
    width: 100%;
    z-index: 99;
}

.tooltip {
    font-family: var(--text-font);
}

.modal-backdrop {
    background-color: #06060626 !important;
}
.modal-content {
    border-radius: 10px;
    border: 1px solid var(--gray-bg);
}

button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
}

.close {
    float: right;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1;
    color: #000;
    /* text-shadow: 0 1px 0 #fff; */
}

.top-menu #main-section .form-group {
    width: 100%;
}

.route-breadcrumbs {
    text-decoration: none;
    color: var(--secondary-text);
    font-size: calc(var(--small-font-size) + 1px);
    line-height: 17px;
}

.route-breadcrumbs:hover {
    color: var(--primary-1);
}

.breadcrumb-item {
    font-size: calc(var(--small-font-size) + 1px);
    line-height: 17px;
}

.journal-button {
    display: flex;
    align-items: center;
    /* width: calc(25% - 12px); */
    width: 290px;
    padding: 24px;
    gap: 12px;
    border-radius: 4px;
    border: 1px solid var(--input-border);
    background: var(
        --default-btn,
        linear-gradient(180deg, #fff 0%, #f3f5f7 100%)
    );
    text-decoration: none;
}
.input-style {
    font-size: calc(var(--bs-font-size) - 1px);
    height: 32px;
}
.input-text {
    /* input */
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.form-control,
.form-select,
.input {
    font-size: var(--bs-font-size) !important;
    font-style: normal;
    font-weight: 400;
    line-height: var(--bs-line-height) !important;
    text-align: left;
    color: var(--text-color) !important;
}

.header-with-button {
    padding: 12px 24px;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.5);
    margin: -24px -24px 24px -24px;
    backdrop-filter: blur(17.5px);
    z-index: 5;
}

.transparent-header-container {
    position: fixed;
    /* Fixes the header at the top of the viewport */
    top: 56px;
    /* Ensures it's pinned to the top */
    right: 0px;
    /* Stretches it across the width */
    padding: 18px 24px;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(17.5px);
    /* Applies a blur effect for aesthetics */
    z-index: 80;
    /* Ensures it's on top of other elements */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* padding: 12px 24px;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.5);
  margin: -24px -24px 24px -24px;
  backdrop-filter: blur(17.5px);
  z-index: 5; */
}
.badge {
    color: var(--primary, #0049b0);
    border-radius: 50px;
    background: var(--req-field-bg, #d9e9ff);
    display: flex;
    padding: 4px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
}
::-webkit-input-placeholder {
    font-size: calc(var(--bs-font-size) - 1px) !important;
}

.label {
    color: var(--text-h4-color);
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
    display: inline-block;
    font-family: var(--text-font);
}

/* Extra small devices (phones) */
@media only screen and (max-width: 600px) {
    :root {
        --bs-font-size: 14px;
    }

    #body-pd,
    .body-pd {
        padding: 0;
    }

    .btn {
        font-size: var(--bs-font-size);
        padding: 10px;
    }

    .content-body {
        padding: 1rem;
    }

    .card.course {
        padding: 16px;
    }

    .top-menu .forminputs {
        width: 100%;
        margin-top: 12px;
    }
}

/* Small devices (portrait tablets and large phones) */
@media screen and (min-width: 600px) and (max-width: 768px) {
    .show {
        width: 0;
    }

    #body-pd,
    .body-pd {
        padding-left: 0;
    }
}

/* Medium devices (landscape tablets) */
@media screen and (min-width: 769px) and (max-width: 1024px) {
    /* .body-pd {
    padding-left: calc(var(--nav-width) + 138px) !important;
    height: 100%;
  } */
    #body-pd,
    .body-pd {
        padding-left: 0;
        height: 100%;
    }
}

/***************tabletaas jijig*******************/
@media only screen and (max-width: 1024px) {
    h3 {
        font-size: calc(var(--bs-font-size));
        line-height: calc(var(--bs-line-height) + 6px);
    }

    h4 {
        font-size: calc(var(--bs-font-size));
        line-height: calc(var(--bs-line-height) + 6px);
    }

    .for-desktop {
        display: none !important;
    }

    .for-desktop-table {
        display: none !important;
    }

    .for-mobile {
        display: block !important;
    }

    .for-mobile-table {
        display: inline-table !important;
    }

    .card.course {
        padding: 1rem !important;
    }

    /* .row {
    margin-top: 50px;
  } */
    #sub-section {
        min-height: auto !important;
    }

    .portrait {
        /* width: 45px;
    height: 45px; */
    }

    .sidebar.close {
        display: none;
        padding-left: 0;
        width: 5px;
    }

    /* mobile navigation */
    .navigation-bar {
        background-color: var(--primary-color);
        height: 56px;
        position: fixed;
        width: 100%;
        z-index: 100;
        /* display: flex; */
    }

    .sisi-teach-logo {
        padding-left: 20px;
        padding-right: 15px;
    }

    .sidebar-head {
        display: none;
    }
}

@media only screen and (min-width: 1024px) {
    /* .row {
    margin-top: 54px;
  } */
    /* .journal-button {
    width: calc(50% - 12px) !important;
  } */
}

/* Large devices (laptops/desktops) */
@media screen and (min-width: 1025px) and (max-width: 1439px) {
    .body-pd {
        padding-left: calc(var(--nav-width) + 188px);
    }
    /* .journal-button {
    width: 290px !important;
  } */
}

/* Extra large devices (large laptops and desktops) */
@media only screen and (min-width: 1440px) and (max-width: 1899px) {
    :root {
        --bs-font-size: 14px;
    }

    .body-pd {
        padding-left: calc(var(--nav-width) + 188px);
    }
}

/* Extra large devices (large laptops and desktops) */
@media only screen and (min-width: 1900px) {
    :root {
        --bs-font-size: 16px;
    }

    .body-pd {
        padding-left: calc(var(--nav-width) + 188px);
    }

    #body-pd .show .nav_link .nav_name {
        font-size: var(--bs-font-size);
    }

    .nav_link .fill img,
    .nav_link .line img {
        height: 22px;
        width: 22px;
    }
}

@media only screen and (min-width: 1025px) {
    .for-desktop {
        display: block !important;
    }

    .for-desktop-table {
        display: inline-table !important;
    }

    .for-mobile {
        display: none !important;
    }

    .for-mobile-table {
        display: none !important;
    }

    .sidebar.close {
        width: var(--nav-width);
    }

    .navigation-bar {
        background-color: #fff;
        border-bottom: 1px solid #cfd7df;
        backdrop-filter: blur(2.5px);
    }
}

@media only screen and (max-width: 1200px) {
    #main-section {
        min-height: auto;
    }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.iframeroute {
    padding-left: 0px;
    padding-right: 0px;
}

.iframeroute .content-section {
    margin-top: calc(var(--header-height) - 24px) !important;
}
.modal-xl-right .modal-dialog {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100vh;
    max-width: 40%;
    width: 100%;
    margin: 0;
    -webkit-transform: translate3d(0%, 0, 0);
    -ms-transform: translate3d(0%, 0, 0);
    -o-transform: translate3d(0%, 0, 0);
    transform: translate3d(0%, 0, 0);
}

.modal-xl-right .modal-content {
    height: 100%;
    overflow-y: auto;
}

.modal-xl-right .modal-header,
.modal-xl-right .modal-body,
.modal-xl-right .modal-footer {
    padding: 1.5rem !important;
}
.modal-xl-right .modal-header {
    border-bottom: 0px;
    padding-bottom: 0px !important;
    justify-content: space-between !important;
}
.modal-xl-right .modal-header .modal-title {
    font-size: var(--big-font-size) !important;
}
.modal-xl-right .modal-body {
    padding-top: 10px !important;
}
.header-left-0 {
    left: 0px;
}

.header-left-65 {
    left: 65px;
}

.header-left-256 {
    left: 256px;
}
.toasted-container .toasted {
    margin: 0.5em 0 !important;
    border-radius: 0.25em !important;
}
.toasted-container.bottom-right {
    right: 23px !important;
}
.toasted .primary.warning,
.toasted.toasted-primary.warning {
    background: #ffc107;
    color: #000;
}

.svgicon {
    width: 24px;
    height: 24px;
}
</style>
