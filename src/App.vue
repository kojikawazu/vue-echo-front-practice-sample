<template>
    <div class="min-h-screen bg-gray-100">
        <Header />
        <router-view />
        <!-- ルートコンポーネントが表示される場所 -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';

export default defineComponent({
    name: 'App',
    components: {
        Header,
    },
});
</script>

<style>
/* グローバルスタイルが必要な場合はここに追加 */
</style>
