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

class ExampleInfo implements IExampleInfo {
    constructor(label: string, name: string, description?: string) {
        this.label = label;
        this.name = name;
        this.description = description;
    }

    label: string;
    name: string;
    description?: string | undefined;
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
    new ExampleInfo(
        "AutoLayout",
        "AutoLayout",
        "Running and animating a layout algorithm after every change to a graph."
    ),
    new ExampleInfo(
        "Boundary",
        "Boundary",
        "Implementing boundary events in BPMN diagrams."
    ),
    new ExampleInfo(
        "HelloPort",
        "HelloPort",
        "Using the isPort hook for visually connecting to another cell"
    ),
];

const jumpToExample = (name: string) => {
    router.push({
        name: name,
    });
};
</script>
