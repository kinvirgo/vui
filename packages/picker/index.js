import { isArray } from "../utils";
import { createNamespace } from "../utils/component";

let createComponent = createNamespace("picker");

export default createComponent({
    props: {
        value: {
            type: Array,
            default: [],
        },
        columns: {
            type: Array | Function,
            default: null,
        },
        async: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        valueKey: {
            type: String,
            default: "value",
        },
        labelKey: {
            type: String,
            default: "label",
        },
        allowHtml: {
            type: Boolean,
            default: false,
        },
        titleText: {
            type: String,
            default: "标题",
        },
        cancelText: {
            type: String,
            default: "取消",
        },
        confirmText: {
            type: String,
            default: "确定",
        },
        safeArea: {
            type: Boolean,
            default: true,
        },
        // 禁止选择项
        disabledColumn: {
            type: Function,
            default: () => false,
        },
        // 禁止修改项
        disabledEidt: {
            type: Function,
            default: () => false,
        },
        single: {
            type: Boolean,
            default: false,
        },
        // 主题颜色
        color: {
            type: String,
            default: "#409eff",
        },
    },
    data() {
        return {
            selected: [],
            sIndex: 0,
            placeholder: "请选择",
        };
    },
    created() {
        this.selected = [...this.value];
        // this.sIndex = (this.selected || []).length;
        this.updateIndex();
    },
    methods: {
        createHeader() {
            return (
                <div class="vui-picker__header--title vui-picker__title">
                    <button vHover class="vui-picker__button--cancel">
                        {this.cancelText}
                    </button>
                    <div class="vui-picker__title--text">{this.$slots.title || this.titleText}</div>
                    <button vHover class="vui-picker__button--confirm">
                        {this.confirmText}
                    </button>
                </div>
            );
        },
        createSelected() {
            const { labelKey, valueKey, selected, sIndex, disabledEidt, onEdit } = this;

            return (
                <ul class="vui-picker__selected">
                    {(selected || []).map((item, index) => {
                        let label = item[labelKey];
                        let value = item[valueKey];
                        let disable = disabledEidt(item, index, selected) || false;
                        let on = sIndex == index;
                        let className = ["vui-picker__selected--item", { disable, on }];
                        let data = { item, index, disable, on };
                        let onClick = (event) => {
                            onEdit(event, data);
                        };

                        return (
                            <li
                                data-value={value}
                                data-label={label}
                                class={className}
                                onClick={onClick}
                                vHover
                            >
                                {label}
                            </li>
                        );
                    })}
                </ul>
            );
        },
        createColumns() {
            const {
                labelKey,
                valueKey,
                columns,
                disabledColumn,
                selected,
                unifySlots,
                isSelect,
                onSelect,
            } = this;
            // console.log(">>>", onSelect);
            let hoverClass = "hover";

            return (
                <ul class="vui-picker__body--options vui-picker__options">
                    {(columns || []).map((item, index) => {
                        let label = item[labelKey];
                        let value = item[valueKey];
                        let disable = disabledColumn(item, index, selected) || false;
                        let on = isSelect(item, index) || false;
                        let className = ["vui-picker__options--item", { disable, on }];
                        let data = { item, disable, index, on };
                        let onClick = (event) => {
                            onSelect(event, data);
                        };

                        return (
                            <li
                                class={className}
                                data-value={value}
                                data-label={label}
                                data-disable={disable}
                                vHover={hoverClass}
                                onClick={onClick}
                            >
                                {unifySlots("item", data) || <div class="multi-line">{label}</div>}
                            </li>
                        );
                    })}
                </ul>
            );
        },
        unifySlots(slotName, ...args) {
            let { $slots, $scopedSlots } = this;
            let slot = $slots[slotName] || null;
            if (!slot && (slot = $scopedSlots[slotName])) {
                slot = slot(...args);
            }
            return slot;
        },
        isSelect(item, index) {
            const { selected } = this;

            // return selected && ;
        },
        onSelect(event, { item, disable }) {
            if (disable) return;
            console.log(">>> onSelect");
            const { sIndex, selected } = this;
            if (selected[sIndex]) {
                // 存在，修改
                let temp = this.selected.slice(0, sIndex) || [];
                temp.push(item);
                this.selected = temp.slice();
            } else {
                // 不存在，新增
                this.selected.push(item);
            }
            this.updateIndex();
            this.onChange();
        },
        onEdit(event, { item, disable, index }) {
            this.sIndex = index;
        },
        updateIndex() {
            // 跟新sIndex
            this.sIndex = (this.selected || []).length;
        },
        onChange() {
            this.$emit("change", [...this.selected]);
        },
    },
    render() {
        // console.log(this.$slots, this.$scopedSlots);
        return (
            <transition name="vui-slide-up">
                <div class={["vui-picker", { "vui-picker__safe-area": this.safeArea }]}>
                    <div class="vui-picker__header">
                        {this.createHeader()}
                        {(this.selected || []).length > 0 && this.createSelected()}
                    </div>
                    <div class="vui-picker__body">{this.createColumns()}</div>
                </div>
            </transition>
        );
    },
});
