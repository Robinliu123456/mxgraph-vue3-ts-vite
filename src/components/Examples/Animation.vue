<script setup lang="ts">
import {
    type mxCell,
    type mxCellState,
    type mxConnectionConstraint,
    type mxMouseEvent,
    type mxGraph,
} from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import {
    myMxCellState,
    myMxConnectionConstraint,
    myMxConnectionHandler,
    myMxEvent,
    myMxGraph,
    myMxPoint,
    myMxPolyline,
    myMxRubberband,
    myMxShape,
} from "../myMxGraph/myMxGraphLoader";

const editorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

const init = (container: HTMLElement) => {
    const graph = new myMxGraph(container);
    graph.setEnabled(false);
    currentGraph.value = graph;

    const parent = graph.getDefaultParent();

    const vertexStyle =
        "shape=cylinder;strokeWidth=2;fillColor=#ffffff;strokeColor=black;" +
        "gradientColor=#a0a0a0;fontColor=black;fontStyle=1;spacingTop=14;";
    const edgeStyle =
        "strokeWidth=3;endArrow=block;endSize=2;endFill=1;strokeColor=black;rounded=1;";

    graph.getModel().beginUpdate();

    let edge1: mxCell;
    try {
        const v1 = graph.insertVertex(
            parent,
            null,
            "Pump",
            20,
            20,
            60,
            60,
            vertexStyle
        );
        const v2 = graph.insertVertex(
            parent,
            null,
            "Tank",
            200,
            150,
            60,
            60,
            vertexStyle
        );
        const e1 = graph.insertEdge(parent, null, "", v1, v2, edgeStyle);
        e1.geometry.points = [new myMxPoint(230, 50)];
        graph.orderCells(true, [e1]);

        edge1 = e1;
    } finally {
        // 更新显示
        graph.getModel().endUpdate();
    }

    // 添加动画
    const state = graph.view.getState(edge1);
    state.shape.node
        .getElementsByTagName("path")[0]
        .removeAttribute("visibility");
    state.shape.node
        .getElementsByTagName("path")[0]
        .setAttribute("stroke-width", "6");
    state.shape.node
        .getElementsByTagName("path")[0]
        .setAttribute("stroke", "lightGray");
    state.shape.node
        .getElementsByTagName("path")[1]
        .setAttribute("class", "flow");
};

onMounted(() => {
    if (editorRef.value) {
        const container = editorRef.value;
        init(container);
    }
});
</script>
<template>
    <div class="example-editor" ref="editorRef"></div>
</template>
<style>
.example-editor {
    background: url("@/assets/editor/images/grid.gif");
    widows: 321px;
    height: 241px;
    position: relative;
}
</style>

<style>
/* 动画样式 */
.flow {
    stroke-dasharray: 8;
    animation: dash 0.5s linear;
    animation-iteration-count: infinite;
}
@keyframes dash {
    to {
        stroke-dashoffset: -16;
    }
}
</style>
