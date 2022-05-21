import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import EditorRoutes from "./editors-routing";
import ExamplesRoutes from "./examples-routeing";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../views/Home.vue"),
        name: "home",
    },
    ...EditorRoutes,
    ...ExamplesRoutes,
];

const routerHistory = createWebHashHistory();

const router = createRouter({
    routes: routes,
    history: routerHistory,
});

export default router;
