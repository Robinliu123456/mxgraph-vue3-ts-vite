import { RouteRecordRaw } from "vue-router";

const ExamplesRoutes: Array<RouteRecordRaw> = [
    {
        path: "/examples",
        component: () => import("../views/Example/Examples.vue"),
        name: "examples",
        children: [
            {
                path: "anchors",
                component: () => import("../components/Examples/Anchors.vue"),
                name: "anchors",
            },
            {
                path: "animation",
                component: () => import("../components/Examples/Animation.vue"),
                name: "Animation",
            },
            {
                path: "autolayout",
                component: () =>
                    import("../components/Examples/Autolayout.vue"),
                name: "AutoLayout",
            },
            {
                path: "boundary",
                component: () => import("../components/Examples/Boundary.vue"),
                name: "Boundary",
            },
            {
                path: "helloport",
                component: () => import("../components/Examples/HelloPort.vue"),
                name: "HelloPort",
            },
        ],
    },
];

export default ExamplesRoutes;
