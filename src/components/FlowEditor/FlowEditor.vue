<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import mx from "./mxGraphLoader";
import addImage from "@/assets/editor/images/add.png";

import {
    type mxGraph,
    type mxCellState,
    type mxCellOverlay,
    type mxShape,
    type mxEventObject,
    type mxEvent,
    type mxCell,
    type mxMouseEvent,
} from "mxgraph";

const flowEditorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

onMounted(() => {
    if (flowEditorRef.value) {
        const container = flowEditorRef.value;
        init(container);
    }
});

const init = (container: HTMLDivElement) => {
    mx.mxEvent.disableContextMenu(container);

    const mxCellRendererInstallCellOverlayListeners =
        mx.mxCellRenderer.prototype.installCellOverlayListeners;

    mx.mxCellRenderer.prototype.installCellOverlayListeners = function (
        state: mxCellState,
        overlay: mxCellOverlay,
        shape: mxShape
    ) {
        mxCellRendererInstallCellOverlayListeners.apply(mx.mxCellRenderer, [
            state,
            overlay,
            shape,
        ]);

        mx.mxEvent.addListener(
            shape.node,
            mx.mxClient.IS_POINTER ? "pointerdown" : "mousedown",
            function (evt: Event) {
                overlay.fireEvent(
                    new mx.mxEventObject(
                        "pointerdown",
                        "event",
                        evt,
                        "state",
                        state
                    ),
                    null
                );
            }
        );

        if (!mx.mxClient.IS_POINTER && mx.mxClient.IS_TOUCH) {
            mx.mxEvent.addListener(
                shape.node,
                "touchstart",
                function (evt: Event) {
                    overlay.fireEvent(
                        new mx.mxEventObject(
                            "pointerdown",
                            "event",
                            evt,
                            "state",
                            state
                        ),
                        null
                    );
                }
            );
        }
    };

    const graph = new mx.mxGraph(container);
    currentGraph.value = graph;

    graph.setPanning(true);
    graph.panningHandler.useLeftButtonForPanning = true;
    graph.setAllowDanglingEdges(false);
    graph.connectionHandler.select = false;
    graph.view.setTranslate(20, 20);

    const rubberBand = new mx.mxRubberband(graph);

    const parent = graph.getDefaultParent();

    const addOverlay = function (cell: mxCell) {
        const overlay = new mx.mxCellOverlay(
            new mx.mxImage(addImage, 24, 24),
            "Add outgoing"
        );

        overlay.cursor = "hand";

        overlay.addListener(mx.mxEvent.CLICK, function (sender, evt2) {
            graph.clearSelection();
            const geo = graph.getCellGeometry(cell);
            let v2: mxCell;

            executeLayout(
                function () {
                    v2 = graph.insertVertex(
                        parent,
                        null,
                        "World!",
                        geo.x,
                        geo.y,
                        80,
                        30
                    );
                    addOverlay(v2);
                    // graph.view.refresh(v2);
                    graph.view.refresh();
                    const el = graph.insertEdge(parent, null, "", cell, v2);
                },
                function () {
                    graph.scrollCellToVisible(v2);
                }
            );
        });

        overlay.addListener(
            "pointerdown",
            function (sender: any, eo: mxEventObject) {
                const evt2 = eo.getProperty("event");
                const state = eo.getProperty("state");

                graph.popupMenuHandler.hideMenu();
                graph.stopEditing(false);

                const pt = mx.mxUtils.convertPoint(
                    graph.container,
                    mx.mxEvent.getClientX(evt2),
                    mx.mxEvent.getClientY(evt2)
                );

                graph.connectionHandler.start(state, pt.x, pt.y);
                graph.isMouseDown = true;
                (graph as any).isMouseTrigger = mx.mxEvent.isMouseEvent(evt2);

                mx.mxEvent.consume(evt2);
            }
        );

        graph.addCellOverlay(cell, overlay);
    };

    const layout = new mx.mxHierarchicalLayout(
        graph,
        mx.mxConstants.DIRECTION_WEST
    );

    let v1: mxCell;

    graph.getModel().beginUpdate();
    try {
        v1 = graph.insertVertex(parent, null, "Hello, ", 0, 0, 80, 30);
        addOverlay(v1);
    } finally {
        graph.getModel().endUpdate();
    }

    const executeLayout = function (change?: Function, post?: Function) {
        graph.getModel().beginUpdate();
        try {
            if (change != null) {
                change();
            }
            layout.execute(graph.getDefaultParent(), [v1]);
        } catch (e) {
            throw e;
        } finally {
            const morgh = new mx.mxMorphing(graph);
            morgh.addListener(
                mx.mxEvent.DONE,

                () => {
                    graph.getModel().endUpdate();

                    if (post != null) {
                        post();
                    }
                }
            );

            morgh.startAnimation();
        }
    };

    const edgeHandleConnect = mx.mxEdgeHandler.prototype.connect;

    mx.mxEdgeHandler.prototype.connect = function (
        edge: mxCell,
        terminal: mxCell,
        isSource: boolean,
        isClone: boolean,
        me: mxMouseEvent
    ) {
        const cell = edgeHandleConnect.apply(mx.mxEdgeHandler, [
            edge,
            terminal,
            isSource,
            isClone,
            me,
        ]);

        executeLayout();

        return cell;
    };

    graph.resizeCell = function (cell, bounds, recurse) {
        return mx.mxGraph.prototype.resizeCell.apply(graph.resizeCell, [
            cell,
            bounds,
            recurse,
        ]);
    };

    graph.connectionHandler.addListener(mx.mxEvent.CONNECT, function () {
        executeLayout();
    });
};
</script>

<template>
    <div class="flow-editor" ref="flowEditorRef"></div>
</template>

<style scoped>
.flow-editor {
    position: relative;
    overflow: auto;
    height: 100vh;
    background: url("@/assets/editor/images/grid.gif");
}
</style>
