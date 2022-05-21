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
        label: "anchors",
        name: "anchors",
        description: "Define fixed connection points for all shapes",
    },
];

const jumpToExample = (name: string) => {
    router.push({
        name: name,
    });
};
</script>
