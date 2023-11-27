import { createApp } from "vue";
import "./style.css";
import App from "./TodoList.vue";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("./TodoList.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");

// https://hackmd.diverse-team.fr/s/SJWuJKvBD
