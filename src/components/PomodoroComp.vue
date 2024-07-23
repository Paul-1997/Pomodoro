<template>
  <main class="bg-[#CD5C5C] min-h-dvh py-8">
    <div class="pomodoro mx-auto px-4">
      <nav class="py-6 mb-10">
        <ul class="flex justify-center items-center gap-x-8">
          <li>
            <RouterLink to="/" class="text-3xl bg-white bg-clip-text text-transparent">
              Pomodoro
            </RouterLink>
          </li>
          <li>
            <button type="button" @click="openDialog('settings')">
              <span class="material-symbols-outlined icon-fill">
                settings
              </span>
            </button>

          </li>
          <li>
            <RouterLink to="">
              <span class="material-symbols-outlined">
                analytics
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="">
              <span class="material-symbols-outlined" @click="openDialog('manual')">
                help
              </span>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="w-fit mb-8 mx-auto py-3 px-10 rounded-lg bg-black bg-opacity-25 text-gray-200 text-3xl">
        {{ workStatus }}
      </div>
      <div class="pomodoro__timer relative mx-auto rounded-full bg-white size-[300px] mb-10">
        <div class="size-[260px] rounded-full bg-red-400 absolute inset-5 grid place-content-center">
          <span class="text-7xl">{{ getFormatRemainTime }}</span>
        </div>
      </div>
      <div class="pomodoro__buttons w-fit mx-auto">
        <button type="button" class="py-2 px-4 min-w-40 rounded-lg bg-gray-100" @click="toggleTimer"
          v-if="timerStatus !== 'running'">Start</button>
        <div v-else>
          <span class="material-symbols-outlined icon-fill text-gray-100 text-5xl leading-none me-4"
            @click="toggleTimer">
            pause
          </span>
          <span class="material-symbols-outlined icon-fill text-gray-100 text-5xl leading-none " @click="skipTimer">
            skip_next
          </span>
        </div>
      </div>
    </div>
  </main>

  <Setting v-model:isShow="showModal" v-if="currModal === 'settings'" />
  <Manual v-model:isShow="showModal" v-if="currModal === 'manual'" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Setting from './dialog/SettingDialog.vue';
import Manual from './dialog/ManualDialog.vue';
import { useSettingsStore } from '@/stores/setting';
import type { WorkStatus, TimerStatus, Task, Pomodoro } from '@/interface/pomodoro';

const { settingConfig } = useSettingsStore();
//status
const currModal = ref('');
const showModal = ref(false);
const workStatus = ref<WorkStatus>('pomodoroTime');
const timerStatus = ref<TimerStatus>('stopped');
//timer 
let timer: number;
//data
const openDialog = (target: string) => {
  currModal.value = target;
  showModal.value = true
}
//pomodoro
const pomodoro = ref<Pomodoro>({
  remainingTime: settingConfig.timer[workStatus.value] * 60,
  currentTask: {
    id: '1',
    content: '',
    totalPomodoros: 0,
    completedPomodoros: 0
  }
});

const getFormatRemainTime = computed((): string => {
  const time = pomodoro.value.remainingTime;
  const m = Math.floor(time / 60).toString().padStart(2, '0');
  const s = (time % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});
//active/pause timer
const toggleTimer = (): void => {
  timerStatus.value = timerStatus.value !== 'running' ? 'running' : 'paused'
  timerStatus.value === 'running' ? runTimer() : stopTimer()
}

const runTimer = () => timer = setInterval(() => pomodoro.value.remainingTime--, 1000);
const stopTimer = () => clearInterval(timer);
// skip/complete task
const skipTimer = (): void => {
  //停止計時器
  stopTimer()
  //完成pomodoro
  if (workStatus.value === 'pomodoroTime') {
    pomodoro.value.currentTask.completedPomodoros++;
    workStatus.value = 'pomodoroTime'
  }
  else {
    workStatus.value = pomodoro.value.currentTask.completedPomodoros % 4 ? 'shortBreak' : 'longBreak'
  }
  timerStatus.value = 'stopped';
  pomodoro.value.remainingTime = settingConfig.timer[workStatus.value] * 60;
}

</script>
<style scoped>
.pomodoro {
  width: clamp(330px, 90vw, 576px);
}
</style>