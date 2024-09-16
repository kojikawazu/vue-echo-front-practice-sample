<template>
    <header class="bg-blue-600 text-white p-4">
        <div class="max-w-2xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">Vue TODOアプリ</h1>
            <nav>
                <router-link to="/" class="mr-4 hover:underline"
                    >ホーム</router-link
                >
                <router-link to="/about" class="hover:underline"
                    >アバウト</router-link
                >
            </nav>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Header',
});
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
