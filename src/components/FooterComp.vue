<template>
  <footer class="bg-white py-5 text-center text-teal-950 text-xl">
    this app is made by <span class="text-orange-300">Paul</span>
    {{ settingConfig.timer.pomodoroTime }}
  </footer>
</template>
<script setup>
import { useSettingsStore } from '@/stores/setting';

const { settingConfig } = useSettingsStore();
</script>