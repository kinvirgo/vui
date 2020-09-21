import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/plugin/hover",
        name: "plugin-hover",
        component: () => import("../views/plugin/hover.vue"),
    },
    {
        path: "/plugin/overlay",
        name: "plugin-overlay",
        component: () => import("../views/plugin/overlay.vue"),
    },
    {
        path: "/plugin/picker",
        name: "plugin-picker",
        component: () => import("../views/plugin/picker.vue"),
    },
    {
        path: "/plugin/message",
        name: "plugin-message",
        component: () => import("../views/plugin/message.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
