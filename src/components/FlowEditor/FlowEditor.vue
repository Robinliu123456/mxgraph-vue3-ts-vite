<script setup lang="ts">
import { mxCellOverlay, mxCellState, mxGraph, mxShape } from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import mxInstance from "./mxGraphLoader";

const { mxEvent } = mxInstance;

const flowEditorRef: Ref<HTMLDivElement | undefined> = ref();
const graph: Ref<mxGraph | undefined> = ref();

onMounted(() => {
    if (flowEditorRef.value) {
        const container = flowEditorRef.value;
        init(container);
    }
});

const init = (container: HTMLDivElement) => {
    graph.value = new mxInstance.mxGraph(container);

    mxInstance.mxEvent.disableContextMenu(container);

    const mxCellRendererInstallCellOverlayListeners =
        mxInstance.mxCellRenderer.prototype.installCellOverlayListeners;

    // mxInstance.mxCellRenderer.prototype.installCellOverlayListeners = function (
    //     state: mxCellState,
    //     overlay: mxCellOverlay,
    //     shape: mxShape
    // ) {
    //     mxInstance.mxCellRenderer.apply(this, arguments);
    // };
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
