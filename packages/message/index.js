import Vue from "vue";
import { isPlainObject, isArray, isString, isTruthValue } from "../utils";
import MessageCompoent from "./message";

let install,
    MessageProxy,
    MessageConstructor = Vue.extend(MessageCompoent);

function createInstace() {
    if (install) {
        install.close();
        return install;
    } else {
        return (install = new MessageConstructor({
            el: document.createElement("div"),
        }));
    }
}

const Message = (options) => {
    let message = createInstace();
    // 参数转换
    typeof options === "string" && (options = { message: options });
    // 参数
    Object.assign(message, { ...Message.defaultOptions, ...options });

    if (message.duration > 0) {
        message.timer = setTimeout(() => {
            install.value = false;
        }, install.duration);
    }
    // 关闭函数
    message.close = () => {
        install.value = false;
        clearTimeout(install.timer);
    };

    // 挂载
    document.body.appendChild(message.$el);

    // 返回关闭函数
    return message.close;
};

Message.defaultOptions = {
    value: true,
    color: "#333333",
    message: "",
    duration: 2000,
    allowHtml: false,
    className: "",
    icon: null,
    direction: "vertical",
    position: "bottom",
    lockScroll: false,
    forbidClick: false,
    zIndex: null,
};

Message.extend = (options) => {
    if (isPlainObject(options)) {
        options = [options];
    }
    if (isArray(options)) {
        options.forEach((option) => {
            const { name } = option;
            if (isString(name) && isTruthValue(name)) {
                /* 扩展方法 */
                MessageProxy[name] = () => {
                    return Message(option);
                };
            }
        });
    } else {
        console.warn("options is plain Object or array");
    }
};

const targetMap = new Map();
MessageProxy = new Proxy(Message, {
    get(target, key, receiver) {
        if (targetMap.has(key)) {
            return targetMap.get(key);
        } else {
            // 原始属性方法
            return Reflect.get(target, key, receiver);
        }
    },
    set(target, key, value, receiver) {
        if (Object.keys(Message).includes(key)) {
            console.warn(`Message hasOwn '${key}' property.`);
            return false;
        } else {
            return targetMap.set(key, value);
        }
    },
});

MessageProxy.install = (Vue) => {
    Vue.prototype.$message = MessageProxy;
};

export default MessageProxy;
