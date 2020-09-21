<template>
    <div>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="div"
                @click="showOverlay"
                >选择地址</vui-hover
            >
            <!-- <vui-overlay @click="show = false" :show="show"></vui-overlay> -->
            <vui-picker :value="[]" :show="show" :columns="pickerData" :disabled-eidt="disabledEidt" :disabled-column="disabledColumn" @change="onChange">
                <!-- slot title -->
                <template slot="title">
                    选择地址
                </template>
                <!-- scope-slot item -->
                <template #item="{item}" >
                    [ {{item.value}} ] {{ item.label }}
                </template>
            </vui-picker>
        </p>
    </div>
</template>

<script>
import { convertFormatData } from "@/utils";
import axios from "axios";
export default {
    data() {
        return {
            show: false,
            data: [],
        };
    },
    computed: {
        pickerData() {
            const { data } = this;
            return data ? convertFormatData(data) : [];
        },
    },
    created() {
        this.getCityInfo("100000");
    },
    methods: {
        onChange(data){
            console.log(">>> onChange", data);
        },
        disabledEidt(item, index, selected){
            return index < 2;
        },
        disabledColumn(item, index, selected){
            return item.value == "150000";
        },
        showOverlay() {
            this.show = true;
        },
        getCityInfo(code) {
            axios
                .post("/mock/address/code", { code }, { "Content-Type": "application/json" })
                .then((results) => {
                    const { data } = results.data;
                    // console.log( data );
                    this.data = data;
                })
                .catch((error) => {});
        },
    },
};
</script>

<style lang="scss">
body {
    background: #f5f5f5;
}
.hover-button {
    // display: inline-block;
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
