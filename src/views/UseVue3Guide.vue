<template>
    <ol>
        <li>
            <h6>安装</h6>
            <pre>
                <code>
# 使用yarn
yarn add mxgraph -S
yarn add @typed-mxgraph/typed-mxgraph -D
                </code>
            </pre>
        </li>
        <li>
            <h6>静态资源</h6>
            <p>
                将<code>/node_modules/mxgraph/javascript/src/</code>下的文件复制到<code>/public/mxgraph-base</code>目录。
            </p>
        </li>
        <li>
            <h6>导入</h6>
            <p>配置mxgraph。</p>
            <pre>
                <code>
// loadMxGraph.ts
import factory from "mxgraph";

(window as any)["mxBasePath"] = "/mxgraph-base";
(window as any)["mxDefaultLanguage"] = "en";
(window as any)["mxImageBasePath"] = "/mxgraph-base/images";
(window as any)["mxLoadResources"] = false;
(window as any)["mxLoadStylesheets"] = false;

// 当通过commonjs加载时为false, 否则会向页面加载script
(window as any)["mxForceIncludes"] = false;
(window as any)["mxResourceExtension"] = ".txt";

const mx = factory({});

export default mx;
                </code>

            </pre>
            在页面中使用
            <pre>
                <code>
// page.vue
// ts
import { type mxGraph } from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import mx from "./loadMxGraph";

const editorRef: Ref&lt;HTMLDivElement | undefined&gt; = ref();
const currentGraph: Ref&lt;mxGraph | undefined&gt; = ref();

onMounted(() => {
    if (editorRef.value) {
        init(editorRef.value);
    }
});

const init = (container: HTMLDivElement) => {
    mx.mxEvent.disableContextMenu(container);
    const graph = new mx.mxGraph(container);
    currentGraph.value = graph;
};

// html
&lt;div class="flow-editor" ref="editorRef"&gt;&lt;/div&gt;
                </code>
            </pre>
        </li>
    </ol>
</template>

<script setup lang="ts"></script>
