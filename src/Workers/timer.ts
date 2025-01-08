let timer: undefined | ReturnType<typeof setInterval>;

let startTime = performance.now();
let countedTime = 0;
let countedMax = 0;

const initTimer = (_seconds: number) => {
  startTime = performance.now();
  countedTime = 0;
  countedMax = _seconds;
};

const calcGapSeconds = () => {
  const gapSecondFromStart = Math.round((performance.now() - startTime) / 1000);
  const gapSecondFromLastTime = gapSecondFromStart - countedTime;
  countedTime += gapSecondFromLastTime;
  const overSecond = countedTime > countedMax ? countedTime - countedMax : 0;
  const gapSecond = gapSecondFromLastTime - overSecond;
  return gapSecond > 0 ? gapSecond : 1;
};

globalThis.onmessage = (e) => {
  const { action, remainingTime } = e.data;
  if (action === 'start') {
    initTimer(remainingTime);
    timer = setInterval(() => {
      const seconds = calcGapSeconds();
      globalThis.postMessage(seconds);
    }, 1000);
  } else if (action === 'stop') {
    clearInterval(timer);
    timer = undefined;
  }
};
