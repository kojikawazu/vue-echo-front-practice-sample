<template>
    <li class="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded">
        <div class="flex items-center">
            <input
                type="checkbox"
                v-model="task.completed"
                @change="updateTask"
                class="mr-3"
            />
            <span :class="{ 'line-through text-gray-500': task.completed }">
                {{ task.text }}
            </span>
        </div>
        <div class="flex items-center">
            <button
                @click="$emit('edit', task)"
                class="mr-2 text-yellow-500 hover:text-yellow-700"
                title="編集"
            >
                ✏️
            </button>
            <button
                @click="$emit('delete', task.id)"
                class="text-red-500 hover:text-red-700"
                title="削除"
            >
                🗑️
            </button>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Task } from '../store/tasks';

export default defineComponent({
    name: 'TaskItem',
    props: {
        task: {
            type: Object as PropType<Task>,
            required: true,
        },
    },
    methods: {
        updateTask() {
            this.$emit('update', this.task);
        },
    },
});
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
