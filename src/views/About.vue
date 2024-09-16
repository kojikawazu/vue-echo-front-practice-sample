<template>
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 class="text-2xl font-bold mb-4">アバウト</h2>
        <p>
            このアプリケーションは、Vue.js 3 と Tailwind CSS
            を使用して作成された TODOリストアプリです。
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'About',
});
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
