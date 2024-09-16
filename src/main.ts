import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import './assets/tailwind.css';
import { useTasksStore } from './store/tasks';

createApp(App).use(router).use(pinia).mount('#app');

// ストアのロード
const tasksStore = useTasksStore();
tasksStore.loadTasks();
