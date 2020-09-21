import { createNamespace } from "../utils/component";
import { emit } from "../utils/functional";
import { PopupContext } from "../utils/mixins/popup";

let createComponent = createNamespace("overlay");

function Overlay(h, ctx, props, slots) {
    function genStyle() {
        return { zIndex: PopupContext.nextZIndex() };
    }

    function onClick(event) {
        emit(ctx, "click", event);
    }

    return (
        <transition name="vui-fade">
            <div class="vui-overlay" vShow={props.show} style={genStyle()} onClick={onClick}>
                {slots.default && slots.default()}
            </div>
        </transition>
    );
}

Overlay.props = {
    show: {
        type: Boolean,
        default: false,
    },
    zIndex: {
        type: Number | Function,
        default: null,
    },
};

export default createComponent(Overlay);
