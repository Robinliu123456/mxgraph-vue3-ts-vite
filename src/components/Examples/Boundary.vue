<script setup lang="ts">
import {
    mxCell,
    mxCellState,
    mxMouseEvent,
    mxPoint,
    type mxGraph,
} from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import {
    myMxConstants,
    myMxEvent,
    myMxGraph,
    myMxGraphHandler,
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

    isCellFoldable(cell: mxCell, collapse: boolean): boolean {
        const childCount = this.model.getChildCount(cell);

        for (let i = 0; i < childCount; i++) {
            const child = this.model.getChildAt(cell, i);
            const geo = this.getCellGeometry(child);

            if (geo != null && geo.relative) {
                return false;
            }
        }

        return childCount > 0;
    }

    // 获取给定子元素的相对未知
    getRelativePosition(state: mxCellState, dx: number, dy: number): mxPoint {
        if (state != null) {
            const model = this.getModel();
            const geo = model.getGeometry(state.cell);

            if (geo != null && geo.relative && !model.isEdge(state.cell)) {
                const parent = model.getParent(state.cell);
                if (model.isVertex(parent)) {
                    const pstate = this.view.getState(parent);

                    if (pstate != null) {
                        const scale = this.view.scale;
                        let x = state.x + dx;
                        let y = state.y + dy;

                        if (geo.offset != null) {
                            x -= geo.offset.x * scale;
                            y -= geo.offset.y * scale;
                        }

                        x = (x - pstate.x) / pstate.width;
                        y = (y - pstate.y) / pstate.height;

                        if (Math.abs(y - 0.5) <= Math.abs((x - 0.5) / 2)) {
                            x = x > 0.5 ? 1 : 0;
                            y = Math.min(1, Math.max(0, y));
                        } else {
                            x = Math.min(1, Math.max(0, x));
                            y = y > 0.5 ? 1 : 0;
                        }

                        return new myMxPoint(x, y);
                    }
                }
            }
        }

        return null as any;
    }

    // Replaces translation for relative children
    // 替换相对子节点的翻译
    translateCell(cell: mxCell, dx: number, dy: number): void {
        const rel = this.getRelativePosition(
            this.view.getState(cell),
            dx * this.view.scale,
            dy * this.view.scale
        );

        if (rel != null) {
            let geo = this.model.getGeometry(cell);
            if (geo != null && geo.relative) {
                geo = geo.clone();

                geo.x = rel.x;
                geo.y = rel.y;

                this.model.setGeometry(cell, geo);
            }
        } else {
            // 父类的方法
            super.translateCell(cell, dx, dy);
        }
    }

    // 替换graphHandler
    createGraphHandler() {
        return new myExGraphHandler(this);
    }

    isCellLocked(cell: mxCell): boolean {
        return false;
    }
}

class myExGraphHandler extends myMxGraphHandler {
    constructor(graph: myExGraph) {
        super(graph);
    }

    get exGraph(): myExGraph {
        return this.graph as myExGraph;
    }

    // Replaces move preview for relative children
    // 取代移动预览相对的子元素
    getDelta(me: mxMouseEvent): mxPoint {
        const point = myMxUtils.convertPoint(
            this.graph.container,
            me.getX(),
            me.getY()
        );

        let delta = new myMxPoint(
            point.x - this.first.x,
            point.y - this.first.y
        );

        if (
            this.cells != null &&
            this.cells.length > 0 &&
            this.cells[0] != null
        ) {
            const state = this.graph.view.getState(this.cells[0]);

            const rel = this.exGraph.getRelativePosition(
                state,
                delta.x,
                delta.y
            );

            if (rel != null) {
                const pstate = this.graph.view.getState(
                    this.graph.model.getParent(state.cell)
                );

                if (pstate != null) {
                    delta = new myMxPoint(
                        pstate.x + pstate.width + rel.x - state.getCenterX(),
                        pstate.y + pstate.height + rel.y - state.getCenterY()
                    );
                }
            }
        }

        return delta;
    }

    shouldRemoveCellsFromParent(
        parent: mxCell,
        cells: mxCell[],
        evt: Event
    ): boolean {
        return (
            cells.length == 0 &&
            !cells[0].geometry.relative &&
            super.shouldRemoveCellsFromParent(parent, cells, evt)
        );
    }
}

const init = (container: HTMLElement) => {
    myMxEvent.disableContextMenu(container);
    const graph = new myExGraph(container);
    currentGraph.value = graph;

    // 设置所有顶点的基础样式
    const style = graph.getStylesheet().getDefaultVertexStyle();
    style[myMxConstants.STYLE_ROUNDED] = true;
    style[myMxConstants.STYLE_FILLCOLOR] = "#ffffff";
    style[myMxConstants.STYLE_STROKECOLOR] = "#000000";
    style[myMxConstants.STYLE_STROKEWIDTH] = "2";
    style[myMxConstants.STYLE_FONTCOLOR] = "#000000";
    style[myMxConstants.STYLE_FONTSIZE] = "12";
    style[myMxConstants.STYLE_FONTSTYLE] = 1;
    graph.getStylesheet().putDefaultVertexStyle(style);

    // 获取给定子元素的相对未知
    const getRelativePosition = (
        state: mxCellState,
        dx: number,
        dy: number
    ) => {
        if (state != null) {
            const model = graph.getModel();
            const geo = model.getGeometry(state.cell);

            if (geo != null && geo.relative && !model.isEdge(state.cell)) {
                const parent = model.getParent(state.cell);
                if (model.isVertex(parent)) {
                    const pstate = graph.view.getState(parent);

                    if (pstate != null) {
                        const scale = graph.view.scale;
                        let x = state.x + dx;
                        let y = state.y + dy;

                        if (geo.offset != null) {
                            x -= geo.offset.x * scale;
                            y -= geo.offset.y * scale;
                        }

                        x = (x - pstate.x) / pstate.width;
                        y = (y - pstate.y) / pstate.height;

                        if (Math.abs(y - 0.5) <= Math.abs((x - 0.5) / 2)) {
                            x = x > 0.5 ? 1 : 0;
                            y = Math.min(1, Math.max(0, y));
                        } else {
                            x = Math.min(1, Math.max(0, x));
                            y = y > 0.5 ? 1 : 0;
                        }

                        return new myMxPoint(x, y);
                    }
                }
            }
        }

        return null;
    };

    new myMxRubberband(graph);

    const parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();
    try {
        const v1 = graph.insertVertex(parent, null, "Process", 60, 60, 90, 40);
        const v2 = graph.insertVertex(
            v1,
            null,
            "in",
            0,
            0.5,
            20,
            20,
            "fontSize=9;shape=ellipse;resizable=0;"
        );
        v2.geometry.offset = new myMxPoint(-10, -10);
        v2.geometry.relative = true;
        const v3 = graph.insertVertex(
            v1,
            null,
            "out",
            1,
            0.5,
            20,
            20,
            "fontSize=9;shape=ellipse;resizable=0;"
        );
        v3.geometry.offset = new myMxPoint(-10, -10);
        v3.geometry.relative = true;
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
}
</style>
