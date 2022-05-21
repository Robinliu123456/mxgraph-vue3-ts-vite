<template>
    <div class="examples d-flex flex-column">
        <div>
            <span>示例: </span>
            <RouterLink
                class="m-3"
                v-for="(example, index) in examples"
                :to="example.url"
            >
                {{ example.label }}
            </RouterLink>
        </div>
        <div class="flex-grow-1">
            <RouterView></RouterView>
        </div>
    </div>
</template>
<script setup lang="ts">
const examples: Array<{
    label: string;
    url: string;
}> = [
    {
        label: "example 1",
        url: "/example1",
    },
    {
        label: "example 2",
        url: "/example2",
    },
];
</script>

<style>
.examples {
    height: 100vh;
}
</style>
