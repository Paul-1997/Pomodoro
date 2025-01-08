<template>
  <div class="pomodoro mx-auto">
    <div class="w-fit mb-8 mx-auto py-3 px-10 rounded-lg bg-black bg-opacity-25 text-gray-200 text-3xl">
      {{ formatWorkStatue }}
    </div>
    <div class="pomodoro__timer relative size-[300px] mx-auto mb-10">
      <svg width="300" height="300" viewbox="0 0 300 300" class="-rotate-90">
        <circle cx="150" cy="150" r="140" stroke-width="20" stroke="#fff" fill="none"></circle>
        <circle
          cx="150"
          cy="150"
          r="140"
          stroke-width="20"
          :stroke="props.currBg"
          fill="none"
          :stroke-dasharray="svgCircle"
          :stroke-dashoffset="svgCircle - countDownProgress"
          style="transition: stroke-dashoffset 1s ease"
        ></circle>
      </svg>
      <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold leading-none">
        {{ getFormatRemainTime }}
      </span>
    </div>
    <div class="pomodoro__buttons w-fit mx-auto">
      <button
        type="button"
        class="py-2 px-4 min-w-40 rounded-lg bg-gray-100"
        @click="toggleTimer('running')"
        v-if="pomodoro.timerStatus !== 'running'"
      >
        Start
      </button>
      <div v-else class="*:cursor-pointer">
        <span
          class="material-symbols-outlined icon-fill text-gray-100 text-5xl leading-none me-4"
          @click="toggleTimer('paused')"
        >
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import useSettingsStore from '@/stores/setting';
import useTaskStore from '@/stores/task';
import useAudio from '@/composable/useAudio';
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

// pomodoro
const pomodoro = ref<Pomodoro>({
  remainingTime: useSetting.settingConfig.timer.pomodoroTime * 60,
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

// timer
let timer: Worker;

onMounted(() => {
  timer = new Worker(new URL('@/Workers/timer.ts', import.meta.url));
  timer.onmessage = (e) => {
    pomodoro.value.remainingTime -= e.data;
    document.title = `${getFormatRemainTime.value} - Pomodoro Focus!`;
  };
});
onUnmounted(() => {
  timer.terminate();
});
// audio
const audio: HTMLAudioElement = new Audio();
const playAudio = (type: string) => useAudio(type, audio);

// active/pause timer
const runTimer = () => {
  if (useSetting.settingConfig.sound.enable_tickSound) {
    useAudio('ticking', audio);
  }

  timer.postMessage({
    action: 'start',
    seconds: pomodoro.value.remainingTime,
  });
};

const stopTimer = () => timer.postMessage({ action: 'stop' });

const toggleTimer = (status: 'running' | 'paused'): void => {
  audio.pause();
  useAudio('button'); // click effect
  pomodoro.value.timerStatus = status;
  if (pomodoro.value.timerStatus === 'running') runTimer();
  else stopTimer();
};

// timer logic
const setProgressPercent = () => {
  const { remainingTime, workStatus } = pomodoro.value;
  const { timer: Timer } = useSetting.settingConfig;
  const percent = remainingTime / (Timer[workStatus] * 60);
  return percent;
};
const svgCircle = 2 * Math.PI * 140; // svg圓周長
const countDownProgress = computed(() => {
  const remain = setProgressPercent() * svgCircle;
  return svgCircle - remain;
});
const finishTimer = (isSkip: boolean = false) => {
  stopTimer();
  // audio.pause();
  pomodoro.value.timerStatus = 'stopped';

  if (pomodoro.value.workStatus === 'pomodoroTime') {
    currPomodoroCount.value++;

    if (useTask.TaskList.length && useTask.currTask?.id) {
      useTask.completePomodoro();
    }
    // otherwise add pomodoroCount to currPlan pomodoroCount
    // if has no plans then add to currTask pomodoroCount
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
