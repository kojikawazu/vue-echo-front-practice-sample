<template>
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <!-- タスク追加フォーム -->
        <form @submit.prevent="handleAddTask" class="flex mb-6">
            <input
                type="text"
                v-model="newTask"
                placeholder="新しいタスクを入力..."
                class="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors"
            >
                追加
            </button>
        </form>

        <!-- タスク一覧 -->
        <ul>
            <TaskItem
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @edit="editTask"
                @delete="deleteTask"
                @update="updateTask"
            />
        </ul>

        <!-- 編集モーダル -->
        <div
            v-if="isEditing && editedTask"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div class="bg-white p-6 rounded shadow-lg w-80">
                <h2 class="text-xl font-bold mb-4">タスクを編集</h2>
                <input
                    type="text"
                    v-model="editedTask.text"
                    class="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <div class="flex justify-end">
                    <button
                        @click="cancelEdit"
                        class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                    >
                        キャンセル
                    </button>
                    <button
                        @click="saveTask"
                        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskItem from '../components/TaskItem.vue';
import { useTasksStore, Task } from '../store/tasks';

export default defineComponent({
    name: 'Home',
    components: {
        TaskItem,
    },
    setup() {
        const tasksStore = useTasksStore();
        const newTask = ref<string>('');
        const isEditing = ref<boolean>(false);
        const editedTask = ref<Task | null>(null);

        const handleAddTask = () => {
            if (newTask.value.trim() === '') return;
            const task: Task = {
                id: Date.now(),
                text: newTask.value.trim(),
                completed: false,
            };
            tasksStore.addTask(task);
            newTask.value = '';
        };

        const deleteTask = (id: number) => {
            tasksStore.deleteTask(id);
        };

        const editTask = (task: Task) => {
            isEditing.value = true;
            editedTask.value = { ...task };
        };

        const cancelEdit = () => {
            isEditing.value = false;
            editedTask.value = null;
        };

        const saveTask = () => {
            if (editedTask.value) {
                tasksStore.updateTask(editedTask.value);
                isEditing.value = false;
                editedTask.value = null;
            }
        };

        const updateTask = (task: Task) => {
            tasksStore.updateTask(task);
        };

        return {
            newTask,
            isEditing,
            editedTask,
            handleAddTask,
            deleteTask,
            editTask,
            cancelEdit,
            saveTask,
            updateTask,
            tasks: tasksStore.tasks,
        };
    },
});
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
