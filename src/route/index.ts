import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import EditorRoutes from "./editors-routing";

const routes: Array<RouteRecordRaw> = [...EditorRoutes];

const routerHistory = createWebHashHistory();

const router = createRouter({
    routes: routes,
    history: routerHistory,
});

export default router;
