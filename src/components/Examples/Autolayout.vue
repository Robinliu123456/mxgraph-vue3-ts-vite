<script setup lang="ts">
import {
    type mxCellOverlay,
    type mxCellState,
    type mxShape,
    type mxGraph,
    mxCell,
    mxHierarchicalLayout,
    mxMouseEvent,
    mxEventObject,
} from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import {
    myMxCellOverlay,
    myMxCellRenderer,
    myMxClient,
    myMxConstants,
    myMxEdgeHandler,
    myMxEvent,
    myMxEventObject,
    myMxHierarchicalLayout,
    myMxImage,
    myMxMorphing,
    myMxRubberband,
    myMxUtils,
} from "../myMxGraph/myMxGraphLoader";
import { myMxGraph } from "../myMxGraph/myMxGraphLoader";
import addImage from "@/assets/editor/images/add.png";

const editorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

const init = (container: HTMLElement) => {
    myMxEvent.disableContextMenu(container);

    const myExCellRendererInstallCellOverlayListeners =
        myMxCellRenderer.prototype.installCellOverlayListeners;

    myMxCellRenderer.prototype.installCellOverlayListeners = function (
        state: mxCellState,
        overlay: mxCellOverlay,
        shape: mxShape
    ) {
        myExCellRendererInstallCellOverlayListeners.apply(myMxCellRenderer, [
            state,
            overlay,
            shape,
        ]);

        myMxEvent.addListener(
            shape.node,
            myMxClient.IS_POINTER ? "pointerdown" : "mousedown",
            function (evt: Event) {
                overlay.fireEvent(
                    new myMxEventObject(
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

        if (!myMxClient.IS_POINTER && myMxClient.IS_TOUCH) {
            myMxEvent.addListener(
                shape.node,
                "touchstart",
                function (evt: Event) {
                    overlay.fireEvent(
                        new myMxEventObject(
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

    const graph = new myMxGraph(container);
    currentGraph.value = graph;

    graph.setPanning(true);
    graph.panningHandler.useLeftButtonForPanning = true;
    graph.setAllowDanglingEdges(false);
    graph.connectionHandler.select = false;
    graph.view.setTranslate(20, 20);

    new myMxRubberband(graph);

    const parent = graph.getDefaultParent();

    const addOverlay = (cell: mxCell) => {
        const overlay = new myMxCellOverlay(
            new myMxImage(addImage, 24, 24),
            "Add outgoing"
        );

        overlay.cursor = "hand";
        overlay.addListener(myMxEvent.CLICK, (sender: any, evt2: Event) => {
            graph.clearSelection();
            const geo = graph.getCellGeometry(cell);
            let v2: mxCell;

            executeLayout(
                () => {
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
                    graph.view.refresh();
                    const el = graph.insertEdge(parent, null, "", cell, v2);
                },
                () => {
                    graph.scrollCellToVisible(v2);
                }
            );
        });

        overlay.addListener("pointerdown", (sender: any, eo: mxEventObject) => {
            const evt2 = eo.getProperty("event");
            const state = eo.getProperty("state");

            graph.popupMenuHandler.hideMenu();
            graph.stopEditing(false);

            const pt = myMxUtils.convertPoint(
                graph.container,
                myMxEvent.getClientX(evt2),
                myMxEvent.getClientY(evt2)
            );

            graph.connectionHandler.start(state, pt.x, pt.y);
            graph.isMouseDown = true;
            (graph as any).isMouseTrigger = myMxEvent.isMouseEvent(evt2);

            myMxEvent.consume(evt2);
        });

        graph.addCellOverlay(cell, overlay);
    };

    const layout = new myMxHierarchicalLayout(
        graph,
        myMxConstants.DIRECTION_WEST
    );

    graph.getModel().beginUpdate();

    let v1: mxCell;
    try {
        v1 = graph.insertVertex(parent, null, "Hello,", 0, 0, 80, 30);
        addOverlay(v1);
    } finally {
        graph.getModel().endUpdate();
    }

    const executeLayout = (change?: Function, post?: Function) => {
        graph.getModel().beginUpdate();

        try {
            if (change != null) {
                change();
            }

            layout.execute(graph.getDefaultParent(), [v1]);
        } catch (e) {
            throw e;
        } finally {
            const morph = new myMxMorphing(graph);
            morph.addListener(myMxEvent.DONE, () => {
                graph.getModel().endUpdate();

                if (post != null) {
                    post();
                }
            });

            morph.startAnimation();
        }
    };

    const edgeConnect = myMxEdgeHandler.prototype.connect;
    myMxEdgeHandler.prototype.connect = function (
        edge: mxCell,
        terminal: mxCell,
        isSource: boolean,
        isClone: boolean,
        me: mxMouseEvent
    ) {
        const cell = edgeConnect.apply(myMxEdgeHandler, [
            edge,
            terminal,
            isSource,
            isClone,
            me,
        ]);

        executeLayout();

        return cell;
    };

    graph.resizeCell = (cell, bounds, recurse) => {
        return myMxGraph.prototype.resizeCell.apply(graph.resizeCell, [
            cell,
            bounds,
            recurse,
        ]);
    };

    graph.connectionHandler.addListener(myMxEvent.CONNECT, function () {
        executeLayout();
    });
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
