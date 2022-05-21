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

class extendedGraph extends myMxGraph {
    constructor(container: HTMLElement) {
        super(container);
    }

    getAllConnectionConstraints(
        terminal: mxCellState,
        source?: boolean
    ): mxConnectionConstraint[] {
        if (terminal != null && terminal.shape) {
            if (terminal.shape.stencil != null) {
                if (terminal.shape.stencil.constraints != null) {
                    return terminal.shape.stencil.constraints;
                }
            } else if (terminal.shape.constraints != null) {
                return terminal.shape.constraints;
            }
        }

        return null as any;
    }

    createConnectionHandler(): extemdedConnectionHandler {
        return new extemdedConnectionHandler(this);
    }
}

class extemdedConnectionHandler extends myMxConnectionHandler {
    constructor(
        graph: mxGraph,
        factoryMethod?: (
            source: mxCell,
            target: mxCell,
            style?: string
        ) => mxCell
    ) {
        super(graph, factoryMethod);
    }

    createEdgeState(me: mxMouseEvent): mxCellState {
        const edge = this.graph.createEdge(
            null as any,
            null,
            null,
            null as any,
            null as any
        );

        return new myMxCellState(
            this.graph.view,
            edge,
            this.graph.getCellStyle(edge)
        );
    }
}

myMxShape.prototype.constraints = [
    new myMxConnectionConstraint(new myMxPoint(0.25, 0), true),
    new myMxConnectionConstraint(new myMxPoint(0.5, 0), true),
    new myMxConnectionConstraint(new myMxPoint(0.75, 0), true),
    new myMxConnectionConstraint(new myMxPoint(0, 0.25), true),
    new myMxConnectionConstraint(new myMxPoint(0, 0.5), true),
    new myMxConnectionConstraint(new myMxPoint(0, 0.75), true),
    new myMxConnectionConstraint(new myMxPoint(1, 0.25), true),
    new myMxConnectionConstraint(new myMxPoint(1, 0.5), true),
    new myMxConnectionConstraint(new myMxPoint(1, 0.75), true),
    new myMxConnectionConstraint(new myMxPoint(0.25, 1), true),
    new myMxConnectionConstraint(new myMxPoint(0.5, 1), true),
    new myMxConnectionConstraint(new myMxPoint(0.75, 1), true),
];

myMxPolyline.prototype.constraints = null as any;

const init = (container: HTMLElement) => {
    const graph = new extendedGraph(container);
    currentGraph.value = graph;

    myMxEvent.disableContextMenu(container);

    graph.setConnectable(true);

    graph.getStylesheet().getDefaultEdgeStyle()["edgeStyle"] =
        "orthogonalEdgeStyle";

    new myMxRubberband(graph);

    const parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();
    try {
        const v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
        const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
        const e1 = graph.insertEdge(parent, null, "", v1, v2);
    } finally {
        graph.getModel().endUpdate();
    }
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
