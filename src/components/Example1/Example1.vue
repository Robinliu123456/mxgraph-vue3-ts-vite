<template>
    <div class="flow-editor" ref="editorRef"></div>
</template>
<script setup lang="ts">
import { mxGraph } from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import { frEvent, frGraph } from "../MxGraphLoader/frGraphLoader";

const editorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

onMounted(() => {
    if (editorRef.value) {
        init(editorRef.value);
    }
});

const init = (container: HTMLDivElement) => {
    frEvent.disableContextMenu(container);
    const graph = new frGraph(container);
    currentGraph.value = graph;
};
</script>
<style scoped>
.flow-editor {
    overflow: auto;
    height: 100%;
    background: url("@/assets/editor/images/grid.gif");
}
</style>
