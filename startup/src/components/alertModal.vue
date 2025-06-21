<template>
    <b-modal
        v-model="showModal"
        centered
        title="Илгээх"
        size="md"
        class="custom-alert-modal"
        dialog-class="custom-modal-width"
        @hidden="hide">
        <template #modal-title>
            <h3 style="margin: 0px">{{ title }}</h3>
        </template>
        <div class="d-flex flex-column align-items-center gap-3">
            <img
                v-if="type === 'success'"
                src="@/assets/svgicons/success-icon.svg"
                alt="Success"
                class="status-icon" />
            <img
                v-if="type === 'error'"
                src="@/assets/svgicons/error.svg"
                alt="Error"
                class="status-icon" />
            <h3
                class="modal-title"
                :class="type === 'success' ? 'success' : 'error'">
                {{ type === 'success' ? 'Амжилттай' : 'Амжилтгүй' }}
            </h3>
            <p class="modal-message" v-html="message"></p>
        </div>
        <template #modal-footer>
            <div class="d-flex justify-content-end m-0">
                <button
                    class="btn btn-secondar"
                    @click="closeModal"
                    data-dismiss="modal">
                    Хаах
                </button>
            </div>
        </template>
    </b-modal>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            validator: (value) => ['success', 'error'].includes(value),
            required: true,
        },
        hide: {
            type: Function,
            required: false,
            default: null,
        },
    },
    computed: {
        showModal: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            },
        },
    },
    methods: {
        onModalHidden() {
            if (this.hide) {
                alert('hide check');
                this.hide(); // Call the function passed as a prop
            }
        },
        closeModal() {
            this.showModal = false;
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
/deep/.custom-alert-modal .modal-content {
    padding: 20px;
}
.status-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
}
/deep/.modal-body {
    padding: 24px;
}
.modal-title {
    color: var(--Success-M_Green, #009262);
    text-align: center;

    /* Button_Link/Medium */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 125% */
}
.success {
    color: var(--Success-M_Green, #009262);
}
.error {
    color: var(--Error-M_danger, red);
}
.modal-message {
    text-align: center;
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
}
.alert-btn {
    display: flex;
    padding: 12px 22px;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid var(--Neutral-Grey, #b4babf);
    background: var(--Neutral-White, #fff);
}

/deep/ .custom-modal-width {
    max-width: 400px;
    width: 50%;
}

@media screen and (min-width: 600px) and (max-width: 768px) {
    /deep/ .show {
        width: 100%;
    }
    /deep/ .custom-modal-width {
        max-width: 400px;
        width: 70%;
    }
}

@media (max-width: 600px) {
    /deep/ .modal-dialog {
        max-width: 500px;
        margin: 1.75rem auto;
    }

    /deep/ .custom-modal-width {
        max-width: 6000px;
        width: 80%;
    }
    /deep/ .custom-modal-width1 {
        max-width: 6000px;
        width: 80%;
    }
    /deep/ .custom-modal-width2 {
        max-width: 6000px;
        width: 80%;
    }
}
/deep/.modal-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
