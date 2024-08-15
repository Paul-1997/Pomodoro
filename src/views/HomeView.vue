<template>
  <main class="relative min-h-dvh py-8 transition-colors duration-1000" :style="{ 'background-color': getCurrBg }">
    <Header @openDialog="openDialog" />
    <div class="mx-auto px-4">
      <div class="grid lg:grid-cols-2 justify-center gap-8">
        <Pomodoro :currBg="getCurrBg" @updateWorkStatue="getStatue" />
        <Task />
      </div>
    </div>

    <Setting v-model:isShow="showModal" v-if="currModal === 'settings'" />
    <Manual v-model:isShow="showModal" v-if="currModal === 'manual'" />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from '@/components/HeaderComp.vue';
import useSettingsStore from '@/stores/setting.ts';
import Pomodoro from '../components/PomodoroComp.vue';
import Footer from '../components/FooterComp.vue';
import Task from '../components/TaskComp.vue';
import Setting from '../components/dialog/SettingDialog.vue';
import Manual from '../components/dialog/ManualDialog.vue';

const useSetting = useSettingsStore();
// dialog

// status
const currModal = ref('');
const showModal = ref(false);
const openDialog = (target: string) => {
  currModal.value = target;
  showModal.value = true;
};
// bg
const currStatue = ref('');
const getStatue = (statue: string) => (currStatue.value = statue);
const getCurrBg = computed(() => {
  if (currStatue.value === 'shortBreak') return useSetting.settingConfig.theme.bgColor.shortBreak;
  if (currStatue.value === 'longBreak') return useSetting.settingConfig.theme.bgColor.longBreak;
  return useSetting.settingConfig.theme.bgColor.pomodoroTime;
});
</script>
