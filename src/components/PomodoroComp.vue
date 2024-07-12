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
            <button type="button" @click="openSettings">
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
              <span class="material-symbols-outlined">
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import type { WorkStatus, TimerStatus, Task, Pomodoro } from '@/interface/pomodoro';

//status
const workStatus = ref<WorkStatus>('work');
const timerStatus = ref<TimerStatus>('stopped');
//timer 
let timer: any;
//data
const Setting = {
  timer: {
    'work': 25,
    'short break': 5,
    'long break': 15,
  },
}
const pomodoro_data: Pomodoro = {
  remainingTime: Setting.timer.work * 60,
  currentTask: {
    id: '1',
    content: '',
    totalPomodoros: 0,
    completedPomodoros: 0
  }
}
const pomodoro = ref(pomodoro_data);

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

const runTimer = () => {
  timer = setInterval(() => {
    console.log(pomodoro.value.remainingTime--);
  }, 1000)
}
const stopTimer = () => clearInterval(timer);
// skip/complete task
const skipTimer = (): void => {
  //停止計時器
  stopTimer()
  //完成pomodoro
  if (workStatus.value === 'work') {
    pomodoro.value.currentTask.completedPomodoros++;
    workStatus.value = 'work'
  }
  else {
    workStatus.value = pomodoro.value.currentTask.completedPomodoros % 4 ? 'short break' : 'long break'
  }
  timerStatus.value = 'stopped';
  pomodoro.value.remainingTime = Setting.timer[workStatus.value] * 60;
}

</script>
<style scoped>
.pomodoro {
  width: clamp(330px, 90vw, 576px);
}
</style>