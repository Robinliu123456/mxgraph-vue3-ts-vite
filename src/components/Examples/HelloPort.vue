<script setup lang="ts">
import { mxCell, type mxGraph } from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import {
    myMxCodec,
    myMxConstants,
    myMxEdgeStyle,
    myMxGraph,
    myMxPoint,
    myMxRubberband,
    myMxUtils,
} from "../myMxGraph/myMxGraphLoader";

const editorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

class myExGraph extends myMxGraph {
    constructor(container: HTMLElement) {
        super(container);
    }

    isPort(cell: mxCell): boolean {
        const geo = this.getCellGeometry(cell);
        return geo != null ? geo.relative : false;
    }

    getTooltipForCell(cell: mxCell) {
        if (this.model.isEdge(cell)) {
            return (
                this.convertValueToString(this.model.getTerminal(cell, true)) +
                " => " +
                this.convertValueToString(this.model.getTerminal(cell, false))
            );
        }

        return super.getTooltipForCell(cell);
    }

    isCellFoldable(cell: mxCell): boolean {
        return false;
    }
}

const init = (container: HTMLElement) => {
    const graph = new myExGraph(container);
    currentGraph.value = graph;

    graph.setConnectable(true);
    graph.setTooltips(true);

    const stye = graph.getStylesheet().getDefaultEdgeStyle();
    stye[myMxConstants.STYLE_EDGE] = myMxEdgeStyle.ElbowConnector;

    new myMxRubberband(graph);

    const parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();
    try {
        const v1 = graph.insertVertex(parent, null, "Hello", 20, 80, 80, 30);
        v1.setConnectable(false);
        const v11 = graph.insertVertex(v1, null, "", 1, 1, 10, 10);
        v11.geometry.offset = new myMxPoint(-5, -5);
        v11.geometry.relative = true;
        const v12 = graph.insertVertex(v1, null, "", 1, 0, 10, 10);
        v12.geometry.offset = new myMxPoint(-5, -5);
        v12.geometry.relative = true;
        const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
        const v3 = graph.insertVertex(parent, null, "World2", 200, 20, 80, 30);
        const e1 = graph.insertEdge(parent, null, "", v11, v2);
        const e2 = graph.insertEdge(parent, null, "", v12, v3);
    } finally {
        // Updates the display
        graph.getModel().endUpdate();
    }

    var button = myMxUtils.button("View XML", function () {
        var encoder = new myMxCodec();
        var node = encoder.encode(graph.getModel());
        myMxUtils.popup(myMxUtils.getPrettyXml(node), true);
    });

    document.body.insertBefore(button, container.nextSibling);
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
}
</style>
