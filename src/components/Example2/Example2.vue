<template>
    <div class="d-flex flex-row" style="height: 100%">
        <div class="sidebar">
            <h1>Example 2</h1>
        </div>
        <div class="flow-editor flex-grow-1" ref="editorRef"></div>
    </div>
</template>

<script setup lang="ts">
import { type mxMouseEvent, type mxCell, type mxGraph } from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import mx from "../FlowEditor/mxGraphLoader";
import {
    frEvent,
    frGraph,
    frGraphHandler,
    frRubberband,
} from "../MxGraphLoader/frGraphLoader";

const editorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

class extendedGraph extends frGraph {
    constructor(container: HTMLElement) {
        super(container);
    }

    // 覆盖
    createGraphHandler(): extendedFrGraphHandler {
        return new extendedFrGraphHandler(this);
    }

    isPart(cell: mxCell) {
        return this.getCurrentCellStyle(cell)["consitituent"] == "1";
    }

    selectCellForEvent(cell: mxCell, evt?: MouseEvent) {
        if (this.isPart(cell)) {
            cell = this.model.getParent(cell);
        }

        super.selectCellForEvent(cell, evt);
    }
}

class extendedFrGraphHandler extends frGraphHandler {
    constructor(graph: extendedGraph) {
        super(graph);
    }

    getInitialCellForEvent(me: mxMouseEvent): mxCell {
        let cell = super.getInitialCellForEvent(me);

        if ((this.graph as any).isPart(cell)) {
            cell = this.graph.getModel().getParent(cell);
        }

        return cell;
    }
}

const init = (container: HTMLDivElement) => {
    frEvent.disableContextMenu(container);
    const graph = new extendedGraph(container);
    currentGraph.value = graph;

    graph.foldingEnabled = false;
    graph.recursiveResize = true;

    new frRubberband(graph);

    const parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();

    try {
        const v1 = graph.insertVertex(parent, null, "", 20, 20, 120, 70);
        const v2 = graph.insertVertex(
            v1,
            null,
            "Constituent",
            20,
            20,
            80,
            30,
            "constituent=1;"
        );
    } finally {
        graph.getModel().endUpdate();
    }
};

onMounted(() => {
    if (editorRef.value) {
        init(editorRef.value);
    }
});
</script>

<style scoped>
.sidebar {
    width: 200px;
}
.flow-editor {
    height: 100%;
    overflow: auto;
    background: url("@/assets/editor/images/grid.gif");
}
</style>
