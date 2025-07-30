import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import useSettingsStore from '@/stores/setting';
import type { TimerState, TimerConfig, TimerAction, TimerEvent } from '@/interface/timer';
import useTimer from './useTimer';
import useAudio from './useAudio';

export default function usePomodoroTimer() {
  const settingsStore = useSettingsStore();

  // Timer state
  const timerState = ref<TimerState>({
    remainingTime: settingsStore.settingConfig.timer.pomodoroTime * 60,
    workStatus: 'pomodoroTime',
    timerStatus: 'stopped',
  });

  const pomodoroCount = ref(0);
  const completedPomodoros = ref(0);
  const events = ref<TimerEvent[]>([]);

  // Computed properties
  const formattedTime = computed(() => {
    const minutes = Math.floor(timerState.value.remainingTime / 60);
    const seconds = timerState.value.remainingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  const progress = computed(() => {
    const totalTime = getCurrentSessionTime() * 60;
    const elapsed = totalTime - timerState.value.remainingTime;
    return {
      current: elapsed,
      total: totalTime,
      percentage: (elapsed / totalTime) * 100,
    };
  });

  const isWorkSession = computed(() => timerState.value.workStatus === 'pomodoroTime');
  const isBreakSession = computed(
    () => timerState.value.workStatus === 'shortBreak' || timerState.value.workStatus === 'longBreak',
  );

  // Timer functions
  const { startTimer, stopTimer } = useTimer((seconds: number) => {
    timerState.value.remainingTime -= seconds;

    // Update document title
    document.title = `${formattedTime.value} - Pomodoro Focus!`;

    // Check if timer is complete
    if (timerState.value.remainingTime <= 0) {
      handleTimerComplete();
    }
  });

  // Helper functions
  const getCurrentSessionTime = (): number => {
    const config = settingsStore.settingConfig.timer;
    switch (timerState.value.workStatus) {
      case 'pomodoroTime':
        return config.pomodoroTime;
      case 'shortBreak':
        return config.shortBreak;
      case 'longBreak':
        return config.longBreak;
      default:
        return config.pomodoroTime;
    }
  };

  const addEvent = (type: TimerEvent['type'], data?: any) => {
    events.value.push({
      type,
      timestamp: Date.now(),
      data,
    });
  };

  const playNotification = (type: 'complete' | 'break' | 'work') => {
    const audio = new Audio();
    useAudio(type, audio);
  };

  // Timer actions
  const startTimerAction = () => {
    if (timerState.value.timerStatus === 'stopped') {
      timerState.value.remainingTime = getCurrentSessionTime() * 60;
      addEvent('start');
    }

    timerState.value.timerStatus = 'running';
    startTimer(timerState.value.remainingTime);
  };

  const pauseTimer = () => {
    timerState.value.timerStatus = 'paused';
    stopTimer();
    addEvent('pause');
  };

  const stopTimerAction = () => {
    timerState.value.timerStatus = 'stopped';
    timerState.value.remainingTime = getCurrentSessionTime() * 60;
    stopTimer();
    addEvent('stop');
  };

  const skipTimer = () => {
    handleTimerComplete();
  };

  const resetTimer = () => {
    stopTimerAction();
    pomodoroCount.value = 0;
    completedPomodoros.value = 0;
    events.value = [];
  };

  // Timer completion handling
  const handleTimerComplete = () => {
    stopTimer();
    addEvent('complete');

    if (isWorkSession.value) {
      completedPomodoros.value++;
      pomodoroCount.value++;
      playNotification('complete');

      // Check if it's time for a long break
      const shouldTakeLongBreak = pomodoroCount.value % settingsStore.settingConfig.timer.longBreakInterval === 0;
      timerState.value.workStatus = shouldTakeLongBreak ? 'longBreak' : 'shortBreak';
      addEvent('break-start', { type: shouldTakeLongBreak ? 'long' : 'short' });
    } else {
      // Break completed, back to work
      timerState.value.workStatus = 'pomodoroTime';
    }

    timerState.value.remainingTime = getCurrentSessionTime() * 60;
    timerState.value.timerStatus = 'stopped';
  };

  // Auto-start next session (optional)
  const autoStartNext = ref(false);

  watch(
    () => timerState.value.timerStatus,
    (newStatus) => {
      if (newStatus === 'stopped' && autoStartNext.value) {
        setTimeout(() => {
          startTimerAction();
        }, 1000);
      }
    },
  );

  // Cleanup
  onUnmounted(() => {
    stopTimer();
  });

  return {
    // State
    timerState: readonly(timerState),
    pomodoroCount: readonly(pomodoroCount),
    completedPomodoros: readonly(completedPomodoros),
    events: readonly(events),

    // Computed
    formattedTime,
    progress,
    isWorkSession,
    isBreakSession,

    // Actions
    startTimer: startTimerAction,
    pauseTimer,
    stopTimer: stopTimerAction,
    skipTimer,
    resetTimer,

    // Settings
    autoStartNext,

    // Helpers
    addEvent,
  };
}
