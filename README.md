# 在Vue3+Vite+TypeScript中使用mxGraph

## 官方文档
[mxGraph 4.2.2 - GitHub Pages](https://jgraph.github.io/mxgraph/)

## 使用

1. 安装
```shell
# 使用yarn
yarn add mxgraph -S
yarn add @typed-mxgraph/typed-mxgraph -D
```
2. 处理静态资源
将`/node_modules/mxgraph/javascript/src/`下的文件复制到`/public/mxgraph-base`目录。

3. 开始使用
```typescript
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
```
script
```typescript
// page.vue script
import { type mxGraph } from "mxgraph";
import { onMounted, ref, Ref } from "vue";
import mx from "./loadMxGraph";

const editorRef: Ref<HTMLDivElement | undefined> = ref();
const currentGraph: Ref<mxGraph | undefined> = ref();

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

```
template
```html
<div class="flow-editor" ref="editorRef"></div>
```
