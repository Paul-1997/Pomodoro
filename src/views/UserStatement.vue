<template>
  使用者pomodoro 統計
  <Suspense>
    <ul>
      <li>{{ DBdata }}</li>
    </ul>
  </Suspense>
  {{ testTask }}
  <button type="button" class="btn px-3 bg-green-400">新增</button>
</template>

<script setup lang="ts">
import generateUniqueId from '@/composable/getUniqueId.ts';
import useIdxDB from '@/composable/useIdxDb.ts';
import type { Task } from '@/interface/task';
import { onMounted, ref } from 'vue';

const DBdata = ref<Task[]>([]);

const testTask: Task = {
  title: '123456789',
  id: generateUniqueId(),
  totalPomodoro: 0,
};

onMounted(async () => {
  const db = await useIdxDB();
  DBdata.value = await db.getAllData();
});
</script>
