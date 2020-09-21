import Vue from "vue";
import { prefix, isFunction } from "./";

export const unifySlots = (ctx) => {
    // slot => scopedSlot
    // slot => ctx.slots().default
    // scopedSlot => ctx.scopedSlots.default()
    const scopedSlots = ctx.scopedSlots || context.data.scopedSlots || {};
    const slots = ctx.slots();
    Object.keys(slots).forEach((key) => {
        if (!scopedSlots[key]) {
            scopedSlots[key] = () => slots[key];
        }
    });

    return scopedSlots;
};

export const toFunctionalComponent = (Component) => {
    return {
        functional: true,
        props: Component.props,
        render() {
            return <div></div>;
        },
        render: (h, ctx) => Component(h, ctx, ctx.props, unifySlots(ctx)),
    };
};

export const createNamespace = (name) => {
    return (Component, install) => {
        if (isFunction(Component)) {
            // is functional
            Component = toFunctionalComponent(Component);
        }

        Component.name = `${prefix}-${name}`;

        Component.install = install
            ? (Vue, options) => {
                  install(Vue, Component, name, options);
              }
            : (Vue, options) => {
                  Vue.component(Component.name, Component);
              };

        return Component;
    };
};

export const mountComponent = (Component, data) => {
    const instance = new Vue({
        el: document.createElement("div"),
        props: Component.props,
        render(h) {
            return h(Component, {
                props: this.props,
                ...data,
            });
        },
    });
    document.body.appendChild(instance.$el);
    return instance;
};
