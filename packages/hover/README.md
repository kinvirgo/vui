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

| 参数        | 说明              | 类型   | 默认值 |
| ----------- | ----------------- | ------ | ------ |
| tag         | 标签名            | String | span   |
| hover-class | 自定义 hover 类名 | String | --     |

### [tips] 当 hover-class 不存在的时候默认会在标签上添加 style = { opacity: 0.8, "user-select": "none" }
