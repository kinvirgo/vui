import { on, off, isString } from "../utils";
import { createNamespace } from "../utils/directive";

let createDirective = createNamespace("hover");

const Hover = (el, binding, vnode) => {
    el.dataset || (el.dataset = {});
    const { value, rawName } = binding;
    // 修复vHover指令
    let hoverClass = null;
    if (rawName || (value && isString(value))) {
        // 组件 v-hover
        // jsx 使用 vHover
        hoverClass = value;
    }
    const onTouchStart = () => {
        // console.log(">>>", binding);
        if (hoverClass) {
            el.classList.add(hoverClass);
        } else {
            let { opacity, userSelect } = el.style;
            if (!el.dataset) el.dataset = {};
            el.dataset.opacity = opacity;
            el.dataset.userSelect = userSelect;
            el.style.opacity = 0.6;
            el.style.userSelect = "none";
        }
    };

    const onTouchEnd = () => {
        if (hoverClass) {
            el.classList.remove(hoverClass);
        } else {
            let { opacity, userSelect } = el.dataset;
            el.style.opacity = opacity;
            el.style.userSelect = userSelect;
        }
    };
    if (!el.dataset.onEvent) {
        // 防止重复
        el.dataset.onEvent = true;
        on(el, "touchstart", onTouchStart);
        on(el, "touchend", onTouchEnd);
        on(el, "touchcancel", onTouchEnd);
    }
};

export default createDirective(Hover);
