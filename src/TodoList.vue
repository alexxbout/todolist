<template>
    <div ref="containerRef" class="flex flex-col w-screen h-screen p-5 overflow-x-hidden transition-all duration-300 bg-white md:p-10 gap-y-10 scroll-smooth">
        <div class="flex flex-col w-full border-b gap-y-2">
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center justify-center gap-x-5 w-max">
                    <span class="text-5xl font-bold text-black">Tâches</span>

                    <button @click="add" class="flex items-center justify-center w-10 h-10 duration-300 bg-blue-600 rounded-xl hover:bg-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-white w-9 h-9" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </button>

                    <select v-model="filter" name="filter" id="filter" class="h-10 px-4 font-medium bg-gray-100 appearance-none rounded-xl">
                        <option value="0" selected>Toutes</option>
                        <option value="1">Terminées</option>
                        <option value="2">En cours</option>
                    </select>
                </div>

                <div class="flex items-center justify-center gap-x-5 w-max">
                    <button @click="removeFinished" class="flex items-center justify-center h-10 px-4 font-medium text-red-600 duration-300 bg-gray-100 rounded-xl hover:bg-gray-300 w-max">Supprimer les tâches terminées</button>
                    <button @click="removeAll" class="flex items-center justify-center h-10 px-4 font-medium text-white duration-300 bg-red-600 rounded-xl hover:bg-red-800 w-max">Supprimer toutes les tâches</button>
                </div>
            </div>

            <span class="text-gray-400">{{ completedTodos.length + " terminée" + (completedTodos.length > 1 ? "s" : "") + " / " + remainingTodos.length + " restante" + (remainingTodos.length > 1 ? "s" : "") }}</span>
        </div>

        <div class="flex flex-col">
            <!-- Il est important de placer le v-for à l'extérieur du composant Todo-->
            <div v-for="todo in filteredTodos" :key="todo.id">
                <Todo @@update="handleUpdate" @@remove="handleRemove" :data="todo" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import Todo from "./components/Todo.vue";
import { ITodo } from "./types/ITodo";

const completedTodos = computed(() => list.value.filter((todo) => todo.completed));
const remainingTodos = computed(() => list.value.filter((todo) => !todo.completed));

const containerRef = ref<HTMLDivElement>();

const filter = ref<number>(0);

const list = ref<ITodo[]>([]);

onMounted(async () => {
    await axios.get<{ todos: { todo: string; completed: boolean }[] }>("https://dummyjson.com/todos").then((res) => {
        res.data.todos.forEach((todo) => {
            list.value.push({
                title: todo.todo,
                completed: todo.completed,
                endDate: new Date(),
                id: getLastId() + 1,
            });
        });
    });
});

const filteredTodos = computed<ITodo[]>(() => {
    return filter.value == 0 ? list.value : filter.value == 1 ? completedTodos.value : remainingTodos.value;
});

const getLastId = (): number => {
    return list.value.length == 0 ? 0 : list.value[list.value.length - 1].id;
};

const add = () => {
    if (containerRef.value) {
        list.value.push({
            title: "Nouvelle tâche",
            completed: false,
            endDate: new Date(),
            id: getLastId() + 1,
        });

        setTimeout(() => {
            if (containerRef.value) containerRef.value.scrollTop = containerRef.value.scrollHeight;
        }, 1);
    }
};

const removeAll = () => {
    list.value = [];
};

const removeFinished = () => {
    list.value = list.value.filter((todo) => !todo.completed);
};

const handleRemove = (id: number) => {
    list.value = list.value.filter((todo) => todo.id != id);
};

const handleUpdate = (id: number, title: string, date: string, completed: boolean) => {
    list.value = list.value.map((todo) => {
        if (todo.id == id) {
            todo.title = title;
            todo.endDate = new Date(date);
            todo.completed = completed;
        }

        return todo;
    });
};

watch(
    () => list.value,
    () => {
        console.log("List updated");
    },
    { deep: true }
);
</script>
