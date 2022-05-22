<script setup lang="ts">
import { type mxGraph } from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import { myMxGraph } from "../myMxGraph/myMxGraphLoader";

const editorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

const init = (container: HTMLElement) => {
    const graph = new myMxGraph(container);
    currentGraph.value = graph;
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
