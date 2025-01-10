import { onMounted, onUnmounted } from 'vue';

export default function useTimer(setTime: (time: number) => void) {
  let timer: Worker;

  onMounted(() => {
    timer = new Worker(new URL('@/Workers/timer.ts', import.meta.url));
    timer.onmessage = (e) => setTime(e.data);
  });
  onUnmounted(() => {
    timer.terminate();
  });

  const startTimer = (seconds: number) => timer.postMessage({ action: 'start', seconds });
  const stopTimer = () => timer.postMessage({ action: 'stop' });

  return { startTimer, stopTimer };
}
