<template>
    <div>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="showOverlay"
                >overlay弹窗</vui-hover
            >
            <vui-overlay @click="show = false" :show="show"></vui-overlay>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },
    methods: {
        showOverlay() {
            this.show = true;
        },
    },
};
</script>

<style lang="scss">
.hover-button {
    display: inline-block;
    padding: 10px 20px;
    background: #07c160;
    border-radius: 2px;
    font-size: 14px;
    line-height: 16px;
    transition: all 0.2s;
    color: #ffffff;

    &__hover {
        opacity: 0.5;
        background: #1989fa;
    }

    &__directive {
        appearance: none;
        outline: none;
        border-radius: 2px;
        border: none;
        padding: 10px 20px;
        background: #1989fa;
        color: #ffffff;
        font-size: 14px;
        line-height: 16px;
        transition: all 0.2s;

        &--hover {
            color: #cccccc;
            opacity: 0.95;
            transform: translateY(1px);
        }
    }
}
</style>
