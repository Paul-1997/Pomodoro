<template>
  <nav class="py-6 mb-10">
    <ul class="flex justify-center items-center gap-x-8">
      <li>
        <RouterLink to="/" class="text-3xl bg-white bg-clip-text text-transparent font-bold leading-tight">
          Pomodoro
        </RouterLink>
      </li>
      <li>
        <button type="button" @click="emit('openDialog', 'settings')">
          <span class="material-symbols-outlined icon-fill text-white"> settings </span>
        </button>
      </li>
      <li>
        <button type="button" @click="emit('openDialog', 'status')">
          <span class="material-symbols-outlined text-white"> analytics </span>
        </button>
      </li>
      <li>
        <button type="button" @click="emit('openDialog', 'manual')">
          <span class="material-symbols-outlined text-white"> help </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['openDialog']);
</script>
