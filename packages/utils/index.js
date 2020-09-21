import Vue from "vue";
export * from "./dom";
// export * from "./component";

export const prefix = "vui";

export const isServer = Vue.prototype.$isServer;

export const noop = () => {};

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);

export const isArray = Array.isArray;

export const isDate = (val) => val instanceof Date;

export const isFunction = (val) => typeof val === "function";

export const isString = (val) => typeof val === "string";

export const isNumber = (val) => typeof val === "number";

export const isSymbol = (val) => typeof val === "symbol";

export const isObject = (val) => val !== null && typeof val === "object";

export const objectToString = Object.prototype.toString;

export const toTypeString = (value) => objectToString.call(value);

export const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
};

export const isPlainObject = (val) => toTypeString(val) === "[object Object]";

// 判断val是否是真值(Truthy)，除(false、0、""、null、undefined 和 NaN)之外
export const isTruthValue = (val) => !!val;

// eslint-disable-next-line import/no-mutable-exports
export let supportsPassive = false;

if (!isServer) {
    try {
        const opts = {};
        Object.defineProperty(opts, "passive", {
            // eslint-disable-next-line getter-return
            get() {
                /* istanbul ignore next */
                supportsPassive = true;
            },
        });
        window.addEventListener("test-passive", null, opts);
        // eslint-disable-next-line no-empty
    } catch (e) {}
}

export const on = (target, event, handler, passive = false) => {
    if (!isServer) {
        target.addEventListener(
            event,
            handler,
            supportsPassive ? { capture: false, passive } : false
        );
    }
};

export const off = (target, event, handler) => {
    if (!isServer) {
        target.removeEventListener(event, handler);
    }
};

export const def = (target, key, value, enumerable) => {
    Object.defineProperty(target, key, {
        value: value,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
};

export const defReadonly = (target, key, value) => {
    Object.defineProperty(target, key, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: true,
    });
};
