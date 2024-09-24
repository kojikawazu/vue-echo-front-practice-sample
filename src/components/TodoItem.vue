<template>
    <li
        class="flex justify-between items-center p-2 border rounded bg-gray-100"
    >
        <div>
            <span class="text-lg" :class="{ 'line-through': task.completed }">
                {{ task.description }}
            </span>
            <span class="ml-2 text-sm text-gray-600">
                - <strong>{{ task.completed ? '完了' : '未完了' }}</strong>
            </span>
        </div>
        <div class="space-x-2">
            <button
                @click="$emit('delete')"
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                削除
            </button>
            <button
                @click="editTask"
                class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
                {{ editing ? '保存' : '編集' }}
            </button>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'TodoItem',
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const editing = ref(false);
        const editTask = () => {
            if (editing.value) {
                // 保存
                emit('update', { ...props.task }); // 更新時に親へ通知
            }
            editing.value = !editing.value;
        };

        return {
            editing,
            editTask,
        };
    },
});
</script>
