import Vue from "vue";

export const PopupContext = {
    zIndex: (Vue.prototype.$VUI || {}).zIndex || 2000,
    nextZIndex(isIncrease) {
        return isIncrease ? PopupContext.zIndex++ : PopupContext.zIndex;
    },
};

export default {
    methods: {
        nextZIndex(isIncrease) {
            return PopupContext.nextZIndex(isIncrease);
        },
    },
};
