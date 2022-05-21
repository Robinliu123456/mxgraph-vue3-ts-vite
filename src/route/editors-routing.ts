import { RouteRecordRaw } from "vue-router";

const EditorsRoutes: Array<RouteRecordRaw> = [
    {
        path: "/example1",
        component: () => import("../components/Example1/Example1.vue"),
        name: "example1",
    },
    {
        path: "/flow-editor",
        component: () => import("../components/FlowEditor/FlowEditor.vue"),
        name: "flow-editor",
    },
    {
        path: "/example2",
        component: () => import("../components/Example2/Example2.vue"),
        name: "example2",
    },
];

export default EditorsRoutes;
