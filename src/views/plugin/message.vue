<template>
    <div>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="hide"
                >隐藏</vui-hover
            >
        </p>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="info"
                >提示消息</vui-hover
            >
        </p>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="multInfo"
                >多行文案提示消息</vui-hover
            >
        </p>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="htmlInfo"
                >html提示消息</vui-hover
            >
        </p>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="general('warn')"
                >警告提示</vui-hover
            >
        </p>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="general('loading')"
                >加载提示</vui-hover
            >
        </p>
        <p>
            <vui-hover
                class="hover-button"
                hover-class="hover-button__hover"
                tag="span"
                @click="general('error')"
                >错误提示</vui-hover
            >
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            stop: null,
        };
    },
    methods: {
        hide() {
            typeof this.stop === "function" && this.stop();
        },
        info() {
            // this.show = true;
            this.stop = this.$message("提示消息.");
        },
        htmlInfo() {
            this.stop = this.$message({
                message: `allow-html<i style='color:#42b983' >这里是消息内容</i>`,
                allowHtml: true,
                // position : "middle"
                position : "top"
            });
        },
        multInfo(){
            this.stop = this.$message({
                message: `allow-html<i style='color:#42b983' >今年初，两篇刊发于中文核心期刊《冰川冻土》的论文引发舆论关注——作者在论述生态经济学的过程中，列举了导师程国栋夫妇的事例，进而阐述“导师的崇高感和师娘的优美感”，并且论文标注属获资两百万国家自然科学基金项目成果。经调查，论文作者徐中民因在国家自然科学基金项目申请书中提供大量虚假信息，已被作出相应处理。</i>`,
                allowHtml: true,
                // position : "middle"
                // position : "top"
                position : "bottom"
            });
        },
        general(type) {
            this.stop = (this.$message[type] || this.$message)();
        },
    },
};
</script>

<style lang="scss">
.hover-button {
    display: inline-block;
    padding: 10px 20px;
    background: #07c160;
    border-radius: 2px;
    font-size: 14px;
    line-height: 16px;
    transition: all 0.2s;
    color: #ffffff;

    &__hover {
        opacity: 0.5;
        background: #1989fa;
    }

    &__directive {
        appearance: none;
        outline: none;
        border-radius: 2px;
        border: none;
        padding: 10px 20px;
        background: #1989fa;
        color: #ffffff;
        font-size: 14px;
        line-height: 16px;
        transition: all 0.2s;

        &--hover {
            color: #cccccc;
            opacity: 0.95;
            transform: translateY(1px);
        }
    }
}
</style>
