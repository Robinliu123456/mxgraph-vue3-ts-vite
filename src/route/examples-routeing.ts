import { RouteRecordRaw } from "vue-router";

const ExamplesRoutes: Array<RouteRecordRaw> = [
    {
        path: "/examples",
        component: () => import("../views/Example/Examples.vue"),
        name: "examples",
        children: [
            {
                path: "anchors",
                component: () => import("../components/Examples/anchors.vue"),
                name: "anchors",
            },
        ],
    },
];

export default ExamplesRoutes;
