// src/store/tasks.ts
import { defineStore } from 'pinia';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
    }),
    actions: {
        addTask(task: Task) {
            this.tasks.push(task);
            this.saveTasks();
        },
        deleteTask(id: number) {
            this.tasks = this.tasks.filter((task) => task.id !== id);
            this.saveTasks();
        },
        updateTask(updatedTask: Task) {
            const index = this.tasks.findIndex(
                (task) => task.id === updatedTask.id
            );
            if (index !== -1) {
                this.tasks[index] = updatedTask;
                this.saveTasks();
            }
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        loadTasks() {
            const tasks = JSON.parse(
                localStorage.getItem('tasks') || '[]'
            ) as Task[];
            this.tasks = tasks;
        },
    },
});
