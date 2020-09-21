<template>
    <div>
        <h3>vui-hover使用</h3>
        <p>
            <vui-hover class="hover-button" tag="span">默认vui-hover</vui-hover>
        </p>
        <p>
            <vui-hover hover-class="hover-button__hover" class="hover-button" tag="span"
                >自定义hover-class</vui-hover
            >
        </p>
        <p>
            <button v-hover class="hover-button__directive">v-hover默认</button>
        </p>
        <p>
            <button v-hover="directiveHoverClass" class="hover-button__directive">v-hover自定义hover-class</button>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hoverClass: "hover-button__hover",
            directiveHoverClass: "hover-button__directive--hover",
        };
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
        transition: all .2s;

        &--hover{
            color: #cccccc;
            opacity: .95;
            transform: translateY(1px);
        }
    }
}
</style>
