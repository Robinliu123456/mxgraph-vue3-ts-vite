<script setup lang="ts">
import UseVue3Guide from "./UseVue3Guide.vue";
import ExampleList from "./Example/ExampleList.vue";
</script>
<template>
    <div class="container">
        <div class="row text-center">
            <h1>在Vue3+Vite+TypeScript中使用mxgraph</h1>
        </div>
        <div class="row">
            <h1>官方文档</h1>
            <p>
                <a href="https://jgraph.github.io/mxgraph/">
                    mxGraph 4.2.2 - GitHub Pages
                </a>
            </p>
        </div>
        <div class="row">
            <h1>使用</h1>
            <UseVue3Guide></UseVue3Guide>
        </div>
        <div class="row">
            <h1>
                示例
                <span> 参照官方的例子使用vue3进行重写 </span>
            </h1>
            <ExampleList></ExampleList>
        </div>
    </div>
</template>
