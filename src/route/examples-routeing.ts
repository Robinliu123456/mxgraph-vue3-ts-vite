import { RouteRecordRaw } from "vue-router";

const ExamplesRoutes: Array<RouteRecordRaw> = [
    {
        path: "/examples",
        component: () => import("../views/Example/Examples.vue"),
        name: "examples",
        children: [],
    },
];

export default ExamplesRoutes;
