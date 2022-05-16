<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import mxGlobal from "../utils/mxgraph";

const containerRef: Ref<HTMLDivElement | undefined> = ref();

const build = (container: HTMLDivElement) => {
    if (!mxGlobal.mxClient.isBrowserSupported()) {
        mxGlobal.mxUtils.error("浏览器不支持", 200, false);
        return;
    }

    const graph = new mxGlobal.mxGraph(container);
    const model = graph.getModel();

    model.beginUpdate();
    try {
        graph.insertVertex(
            graph.getDefaultParent(),
            "",
            "TEST",
            0,
            0,
            100,
            100
        );
    } finally {
        model.endUpdate();
    }
};

onMounted(() => {
    if (containerRef.value == undefined) {
        return;
    }

    const container = containerRef.value;

    build(container);
});
</script>

<template>
    <div id="graph-editor" ref="containerRef"></div>
</template>

<style scoped>
#graph-editor {
    position: relative;
    overflow: hidden;

    height: 300px;
}
</style>
