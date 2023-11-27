<template>
    <div @click="handleClick" class="flex items-center w-full mb-1 border-b h-max gap-x-5">
        <!-- Checkbox -->
        <label :for="uniqueId" class="relative flex items-center justify-center">
            <input @change="updateData" v-model="completed" :name="uniqueId" :id="uniqueId" type="checkbox" :class="props.data.completed ? 'border-blue-600' : 'border-gray-400'" class="z-10 peer aspect-square w-5 text-blue-600 bg-tr border-[1px] appearance-none focus:ring-blue-500 rounded-full focus:ring-2" />

            <span class="z-0 absolute bg-blue-600 rounded-full w-max aspect-square p-[6px] peer-checked:inline hidden"></span>
        </label>

        <!-- Title and date -->
        <div class="flex flex-col w-full gap-y-2">
            <input @change="updateData" ref="titleRef" v-model="title" type="text" class="text-xl font-medium text-black bg-transparent outline-none appearance-none" :class="props.data.completed ? 'line-through text-gray-400' : 'text-black'" />

            <input @change="updateData" ref="dateRef" v-model="date" type="datetime-local" class="text-gray-400 bg-transparent outline-none appearance-none w-44" />
        </div>

        <!-- Delete button -->
        <button @click="remove" class="text-red-600">Supprimer</button>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { ITodo } from "../types/ITodo";

const props = defineProps({
    data: {
        type: Object as PropType<ITodo>,
        required: true,
    },
});

const uniqueId = ref(`todo#${props.data.id}`);

const completed = ref<boolean>(props.data.completed);
const title = ref<string>(props.data.title);
const date = ref<string>(props.data.endDate.toISOString().slice(0, 16));

const titleRef = ref<HTMLInputElement>();
const dateRef = ref<HTMLInputElement>();

let clickCount = 0;
let lastClickTime = 0;

const handleClick = () => {
    const now = Date.now();
    const DOUBLE_CLICK_DELAY = 300;

    if (now - lastClickTime < DOUBLE_CLICK_DELAY) {
        // Double click
    } else {
        // Simple click
        clickCount++;
        setTimeout(() => {
            clickCount = 0;
        }, DOUBLE_CLICK_DELAY);
    }

    lastClickTime = now;
};

const emits = defineEmits<{
    (e: "@remove", id: number): void;
    (e: "@update", id: number, title: string, date: string, completed: boolean): void;
}>();

const remove = () => {
    emits("@remove", props.data.id);
};

const updateData = () => {
    // Check if string is empty and emit remove event if it is
    if (title.value.trim() === "") {
        emits("@remove", props.data.id);
    } else {
        emits("@update", props.data.id, title.value, date.value, completed.value);
    }
};

watch(
    () => completed.value,
    (value) => {
        // Disable the title and date if the todo is completed
        if (titleRef.value && dateRef.value) {
            titleRef.value.disabled = value;
            dateRef.value.disabled = value;
        }
    }
);
</script>
