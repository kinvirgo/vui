import { createNamespace } from "../utils/component";
import TouchMixin from "../utils/mixins/touch";
import Directive from "./directive";

let createComponent = createNamespace("hover");

export default createComponent(
    {
        mixins: [TouchMixin],
        props: {
            tag: {
                type: String,
                default: "span",
            },
            hoverClass: {
                type: String,
                default: "",
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                hover: false,
            };
        },
        mounted() {
            this.bindTouchEvent(this.$el);
        },
        methods: {
            onTouchStart() {
                this.hover = true;
            },
            onTouchMove() {},
            onTouchEnd() {
                this.hover = false;
            },
            onClick(event) {
                if (!this.disabled) {
                    this.$emit("click", event);
                }
            },
        },
        render(h) {
            let { tag: Tag, hover, hoverClass, $slots, disabled } = this;
            let style = { opacity: 0.6, "user-select": "none", "-webkit-user-select": "none" };
            let className = null;
            if(hover && !disabled){
                !!hoverClass && (style = null);
                className = hoverClass;
            }else{
                style = null;
                className = null;
            }
            return (
                <Tag class={className} style={style} onClick={this.onClick} disabled={disabled}>
                    {$slots.default}
                </Tag>
            );
        },
    },
    (Vue, Component, name, options) => {
        Component.directive = Directive;
        // console.log(">>> install", Component);
        Vue.component(Component.name, Component);
        // directive
        Vue.directive(Directive.name, Directive);
    }
);
