<template>
    <ol>
        <li v-for="(example, index) in examples">
            <button
                class="btn btn-link"
                type="button"
                @click="jumpToExample(example.name)"
            >
                {{ example.label }}
            </button>
            <p>
                {{ example.description }}
            </p>
        </li>
    </ol>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

interface IExampleInfo {
    label: string;
    name: string;
    description?: string;
}
const examples: Array<IExampleInfo> = [
    {
        label: "Anchors",
        name: "anchors",
        description: "Define fixed connection points for all shapes",
    },
    {
        label: "Animation",
        name: "Animation",
        description: "Using SVG animation to visualize the flow in a pipe",
    },
];

const jumpToExample = (name: string) => {
    router.push({
        name: name,
    });
};
</script>
