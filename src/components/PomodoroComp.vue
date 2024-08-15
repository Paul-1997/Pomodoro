<template>
  <div class="pomodoro mx-auto">
    <div class="w-fit mb-8 mx-auto py-3 px-10 rounded-lg bg-black bg-opacity-25 text-gray-200 text-3xl">
      {{ formatWorkStatue }}
    </div>
    <div class="pomodoro__timer relative mx-auto rounded-full bg-white size-[300px] mb-10">
      <div
        class="size-[260px] rounded-full absolute inset-5 grid place-content-center transition-colors duration-1000"
        :style="{
          'background-color': props.currBg,
        }"
      >
        <span class="text-7xl">{{ getFormatRemainTime }}</span>
      </div>
    </div>
    <div class="pomodoro__buttons w-fit mx-auto">
      <button
        type="button"
        class="py-2 px-4 min-w-40 rounded-lg bg-gray-100"
        @click="toggleTimer"
        v-if="pomodoro.timerStatus !== 'running'"
      >
        Start
      </button>
      <div v-else class="*:cursor-pointer">
        <span class="material-symbols-outlined icon-fill text-gray-100 text-5xl leading-none me-4" @click="toggleTimer">
          pause
        </span>
        <span class="material-symbols-outlined icon-fill text-gray-100 text-5xl leading-none" @click="finishTimer()">
          skip_next
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import useSettingsStore from '@/stores/setting.ts';
import useTaskStore from '@/stores/task.ts';
import useAudio from '@/composable/useAudio.ts';
import type { Pomodoro } from '@/interface/pomodoro';

const useSetting = useSettingsStore();
const useTask = useTaskStore();
const props = defineProps({
  currBg: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['updateWorkStatue']);

// timer
let timer: number | NodeJS.Timeout;
// audio
const audio: HTMLAudioElement = new Audio();
const playAudio = (type: string) => useAudio(type, audio);
// pomodoro
const pomodoro = ref<Pomodoro>({
  remainingTime: useSetting.settingConfig.timer.pomodoroTime - 20,
  workStatus: 'pomodoroTime',
  timerStatus: 'stopped',
});
const currPomodoroCount = ref(0);

const getFormatRemainTime = computed((): string => {
  const time = pomodoro.value.remainingTime;
  const m = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const s = (time % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});
const formatWorkStatue = computed(() => {
  if (pomodoro.value.workStatus === 'pomodoroTime') return 'Work';
  return pomodoro.value.workStatus === 'shortBreak' ? 'short break' : 'long break';
});
// active/pause timer
const runTimer = () => {
  let tickTimeout: NodeJS.Timeout | null = null;

  if (useSetting.settingConfig.sound.enable_tickSound) {
    tickTimeout = setTimeout(() => {
      useAudio('ticking', audio);
      if (tickTimeout) {
        clearTimeout(tickTimeout);
        tickTimeout = null;
      }
    }, 1000);
  }

  const timerInterval = setInterval(() => {
    pomodoro.value.remainingTime--;
    // 如果剩余时间为 0，清除定时器
    if (pomodoro.value.remainingTime <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
};

const stopTimer = () => clearInterval(timer);

const toggleTimer = (): void => {
  audio.src = '';
  useAudio('button', audio); // click effect
  pomodoro.value.timerStatus = pomodoro.value.timerStatus !== 'running' ? 'running' : 'paused';
  if (pomodoro.value.timerStatus === 'running') runTimer();
  else stopTimer();
};

// timer logic
const finishTimer = (isSkip: boolean = false) => {
  // 先暫停計時器
  audio.pause();
  stopTimer();
  pomodoro.value.timerStatus = 'stopped';

  if (pomodoro.value.workStatus === 'pomodoroTime') {
    currPomodoroCount.value++;
    useTask.completePomodoro();
    const status =
      currPomodoroCount.value % useSetting.settingConfig.timer.longBreakInterval ? 'shortBreak' : 'longBreak';
    pomodoro.value.workStatus = status;
  } else {
    pomodoro.value.workStatus = 'pomodoroTime';
  }
  // reset time
  pomodoro.value.remainingTime = useSetting.settingConfig.timer[pomodoro.value.workStatus] * 60;
  // autoStart
  if (!isSkip) {
    if (useSetting.settingConfig.timer.enable_autoStartBreak && pomodoro.value.workStatus !== 'pomodoroTime') {
      pomodoro.value.timerStatus = 'running';
      runTimer();
    } else if (
      useSetting.settingConfig.timer.enable_autoStartPomodoro &&
      pomodoro.value.workStatus === 'pomodoroTime'
    ) {
      pomodoro.value.timerStatus = 'running';
      runTimer();
    }
  }
};

watch(
  () => pomodoro.value,
  () => {
    if (pomodoro.value.timerStatus !== 'running') stopTimer();
    if (pomodoro.value.remainingTime < 1) {
      playAudio('alarm');
      finishTimer();
    }
  },
  { deep: true },
);
watch(
  () => pomodoro.value.workStatus,
  (newVal) => {
    emit('updateWorkStatue', newVal);
  },
);
</script>
<style scoped>
.pomodoro {
  width: clamp(330px, 90vw, 576px);
}
</style>
