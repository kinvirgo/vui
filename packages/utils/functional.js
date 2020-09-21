const inheritKey = [
    "ref",
    "style",
    "class",
    "attrs",
    "nativeOn",
    "directives",
    "staticClass",
    "staticStyle",
];

const mapInheritKey = { nativeOn: "on" };

export function inherit(context, inheritListeners) {
    const result = inheritKey.reduce((obj, key) => {
        if (context.data[key]) {
            obj[mapInheritKey[key] || key] = context.data[key];
        }
        return obj;
    }, {});

    if (inheritListeners) {
        result.on = result.on || {};
        Object.assign(result.on, context.data.on);
    }

    return result;
}

export function emit(context, eventName, ...args) {
    const listeners = context.listeners[eventName];
    if (listeners) {
        if (Array.isArray(listeners)) {
            listeners.forEach((listener) => {
                listener(...args);
            });
        } else {
            listeners(...args);
        }
    }
}
