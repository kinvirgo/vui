import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// import Hover from "../packages/hover"
// Vue.use(Hover);

import vui, { Message }  from "../packages";
import "../packages/index.scss";
Vue.use(vui);

/*===自定义===*/

/* 成功 */
const successBase64 =
    "data:image/png;base64,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";

/* 失败 */
const failBase64 =
    "data:image/png;base64,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";

/* 警告 */
const warnBase64 =
    "data:image/png;base64,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";

/* 扩展方法 */
Message.extend([
    {
        name: "loading",
        message: "加载中...",
        duration: 0,
        icon: "circular",
        color: "#1989fa",
        position: "middle",
        // direction : "horizontal"
    },
    {
        name: "success",
        message: "操作成功",
        duration: 1500,
        icon: successBase64,
        color: "#1989fa",
        position: "middle",
        // direction : "horizontal"
    },
    {
        name: "error",
        message: "操作失败",
        duration: 1500,
        icon: failBase64,
        color: "#D81E06",
        position: "middle",
    },
    {
        name: "warn",
        message: "操作警告",
        duration: 1500,
        icon: warnBase64,
        color: "#FFB20E",
        position: "middle",
    },
]);

/*===自定义===*/

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
