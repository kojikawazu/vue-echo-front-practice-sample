<!-- src/components/TodoList.vue -->
<template>
    <div class="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
        <h1 class="text-2xl font-bold mb-4 text-center">TODOリスト</h1>

        <form @submit.prevent="addTask" class="flex mb-4">
            <input
                v-model="newTaskDescription"
                placeholder="新しいタスクを入力..."
                class="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors"
            >
                追加
            </button>
        </form>

        <ul>
            <TodoItem
                v-for="todo in todos"
                :key="todo.id"
                :task="todo"
                @delete="deleteTask(todo.id)"
                @update="updateTask(todo)"
            />
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import TodoItem from '../components/TodoItem.vue';

// Task型を定義
interface Task {
    id: number;
    description: string;
    completed: boolean;
}

export default defineComponent({
    name: 'TodoList',
    components: {
        TodoItem,
    },
    setup() {
        const todos = ref<Task[]>([]);
        const newTaskDescription = ref<string>('');

        // データ取得
        onMounted(async () => {
            await fetchTodos();
        });

        // タスク取得
        const fetchTodos = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/todos`
                );
                todos.value = response.data;
            } catch (error) {
                console.error('データ取得に失敗しました', error);
            }
        };

        // タスク追加
        const addTask = async () => {
            try {
                const newTask = {
                    user_id: import.meta.env.VITE_APP_USER_ID,
                    description: newTaskDescription.value,
                    completed: false,
                };
                await axios.post(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/todos`,
                    newTask
                );
                newTaskDescription.value = ''; // 入力フィールドをクリア
                await fetchTodos(); // 再度タスクリストを取得
            } catch (error) {
                console.error('タスクの追加に失敗しました', error);
            }
        };

        // タスク削除
        const deleteTask = async (id: number) => {
            try {
                await axios.delete(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/todos/${id}`
                );
                await fetchTodos();
            } catch (error) {
                console.error('タスクの削除に失敗しました', error);
            }
        };

        // タスク更新
        const updateTask = async (task: Task) => {
            try {
                const changeTask = {
                    user_id: import.meta.env.VITE_APP_USER_ID,
                    description: task.description,
                    completed: !task.completed,
                };
                await axios.put(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/todos/${task.id}`,
                    changeTask
                );
                await fetchTodos();
            } catch (error) {
                console.error('タスクの更新に失敗しました', error);
            }
        };

        return {
            todos,
            newTaskDescription,
            addTask,
            deleteTask,
            updateTask,
        };
    },
});
</script>
