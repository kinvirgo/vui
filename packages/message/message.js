import { noop, isTruthValue, isFunction  } from "../utils";
import { createNamespace } from "../utils/component";
import { PopupContext } from "../utils/mixins/popup";

let createComponent = createNamespace("message");

export default createComponent(
    {
        props: {
            value: Boolean,
            message: {
                type: String,
                default: "",
            },
            color: {
                type: String,
                default: "#333333",
            },
            duration: {
                type: Number,
                default: 2000,
            },
            allowHtml: {
                type: Boolean,
                default: true,
            },
            className: {
                type: String,
                default: "",
            },
            icon: {
                type: String | null,
                default: null,
            },
            position: {
                type: String,
                default: "bottom",
            },
            zIndex: {
                type: Number | Function,
                default: null,
            },
            direction: {
                type: String,
                default: "vertical",
            },
            lockScroll: {
                type: Boolean,
                default: false,
            },
            forbidClick: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            genContent() {
                if (this.allowHtml) {
                    return <div class="vui-message__text" domPropsInnerHTML={this.message}></div>;
                } else {
                    return <div class="vui-message__text">{this.message}</div>;
                }
            },
            genIcon() {
                const { icon, direction } = this;
                if (!isTruthValue(icon)) return;
                let iconHtml =
                    icon == "circular" ? (
                        this.iconCircular()
                    ) : (
                        <img class="vui-message__icon--img" src={icon} />
                    );
                return <div class={`vui-message__icon`}>{iconHtml}</div>;
            },
            iconCircular() {
                return (
                    <svg viewBox="25 25 50 50" class="vui-loading__circular">
                        <circle cx="50" cy="50" r="20" fill="none"></circle>
                    </svg>
                );
            },
            iconSpinner() {
                return (
                    <div>
                        {Array(12)
                            .fill(0)
                            .map(() => {
                                return <i />;
                            })}
                    </div>
                );
            },
            boxStyle() {
                let { zIndex, color } = this;
                if (isFunction(zIndex)) {
                    zIndex = zIndex();
                } else if (!isTruthValue(zIndex)) {
                    // zIndex = this.updateZIndex();
                    zIndex = PopupContext.nextZIndex();
                }
                return { zIndex, color };
            },
        },
        render() {
            const { icon, direction } = this;
            let boxClass = `vui-message vui-message__${this.position} ${this.className} `;
            if (isTruthValue(icon) && isTruthValue(direction)) {
                boxClass += ` vui-message__${direction}`;
            }
            return (
                <transition name={this.transition}>
                    <div ref="message" vShow={this.value} class={boxClass} style={this.boxStyle()}>
                        {this.genIcon()}
                        {this.genContent()}
                    </div>
                </transition>
            );
        },
    },
    noop
);
