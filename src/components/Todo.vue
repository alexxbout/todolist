<template>
    <div @click="handleClick" class="flex items-center w-full p-2 mb-1 transition-colors border-b rounded-md cursor-pointer h-max gap-x-5" :class="isEditing ? 'bg-gray-100' : ''">
        <!-- Checkbox -->
        <label :for="uniqueId" class="relative flex items-center justify-center">
            <input @change="toggle" v-model="completed" :name="uniqueId" :id="uniqueId" type="checkbox" :class="props.data.completed ? 'border-blue-600' : 'border-gray-400'" class="peer aspect-square w-5 text-blue-600 bg-tr border-[1px] appearance-none focus:ring-blue-500 rounded-full focus:ring-2" />

            <span class="absolute bg-blue-600 rounded-full w-max aspect-square p-[6px] peer-checked:inline hidden"></span>
        </label>

        <!-- Title and date -->
        <div class="flex flex-col w-full gap-y-2 max-w-[100%]">
            <input @blur="isEditing = false" @change="updateData" ref="titleRef" v-model="title" type="text" class="px-1 text-xl font-medium bg-transparent outline-none appearance-none max-w-screen w-60" :class="props.data.completed ? 'line-through text-gray-400' : isEditing ? 'text-blue-600' : 'text-black'" :disabled="!isEditing" />

            <input ref="dateRef" v-model="date" type="datetime-local" class="text-gray-400 bg-transparent outline-none appearance-none w-44" />
        </div>

        <!-- Delete button -->
        <button @click="remove" class="text-red-600">Supprimer</button>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
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

const isEditing = ref<boolean>(false);

let clickCount = 0;
let lastClickTime = 0;


const handleClick = () => {
    const now = Date.now();
    const DOUBLE_CLICK_DELAY = 300;

    if (now - lastClickTime < DOUBLE_CLICK_DELAY) {
        // Double click
        if (!completed.value) {
            isEditing.value = !isEditing.value;

            if (isEditing.value) {
                setTimeout(() => {
                    titleRef.value?.focus();

                    // Set caret position to the end of the input
                    if (titleRef.value) {
                        titleRef.value.selectionStart = titleRef.value.selectionEnd = titleRef.value.value.length;
                    }
                }, 0);
            }
        }
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

const toggle = () => {
    // Disable the title and date if the todo is completed
    if (titleRef.value && dateRef.value) {
        titleRef.value.disabled = completed.value;
        dateRef.value.disabled = completed.value;

        if (completed.value) {
            isEditing.value = false;
        }
    }

    updateData();
};

const updateData = () => {
    // Check if string is empty and emit remove event if it is
    if (title.value.trim() === "") {
        emits("@remove", props.data.id);
    } else {
        emits("@update", props.data.id, title.value, date.value, completed.value);
    }
};

// watch(
//     () => completed.value,
//     (value) => {
//         // Disable the title and date if the todo is completed
//         if (titleRef.value && dateRef.value) {
//             titleRef.value.disabled = value;
//             dateRef.value.disabled = value;
//         }
//     }
// );
</script>
