# Hover

### 介绍

移动端模拟 PC 端 hover 效果

### 引入

```js
import Vue from "vue";
import Hover from "vui";

Vue.use(Hover);
```

### 代码演示

### 组件

```html
<vui-hover tag="button"
    >组件使用<vui-hover>
        // 通过hover-class自定义hover样式
        <vui-hover hover-class="custom-hover-class" tag="button"
            >组件使用<vui-hover></vui-hover></vui-hover></vui-hover
></vui-hover>
```

### 指令

```html
<button v-hover>指令使用</button>

// 通过设置指令值自定义hover-class样式
<button v-hover="`custom-hover-class`">指令使用</button>
```

## API

### Props

| 参数           | 说明                               | 类型              | 默认值    |
| -------------- | ---------------------------------- | ----------------- | --------- |
| value\v-model  | 选中项绑定值,或者初始化值          | --                | --        |
| columns        | 对象数组，配置每一列显示的数据     | Array \| Function | []        |
| async          | 异步 columns                       | Boolean           | false     |
| loading        | 是否开启异步加载中                 | Boolean           | false     |
| label-key      | 配置每一项 value 的 text           | String            | label     |
| value-key      | 配置每一项 value 的 key            | String            | value     |
| allow-html     | 配置每一项 label 的 text 允许 html | Boolean           | false     |
| title-text     | 标题                               | String            | --        |
| cancel-text    | 取消按钮文本                       | String            | 取消      |
| confirm-text   | 确定按钮文本                       | String            | 确定      |
| safe-area      | iphone 底部安全区域                | Boolean           | true      |
| disabledColumn | 设置禁用状态                       | Function          | ()=>false |
| color | 主题颜色                       | String          | #409eff |

### Events

| 事件名  | 说明           | 回调参数 |
| ------- | -------------- | -------- |
| confirm | 点击确认时触发 | --       |
| cancel  | 点击取消时触发 | --       |
| change  | 选项改变时触发 | --       |

### Slots

| 名称  | 说明           |
| ----- | -------------- |
| title | 自定义标题内容 |

### scope-Slots

| 名称   | 参数 | 说明             |
| ------ | ---- | ---------------- |
| column | --   | 自定义每一项内容 |

### column {}

| 名称     | 说明                      | 类型             | 默认值 |
| -------- | ------------------------- | ---------------- | ------ |
| label    | 展示的每项文本、允许 html | String           | --     |
| value    | 展示的每项文本            | String \| number | --     |
| disabled | 是否禁用该项              | Boolean          | false  |
