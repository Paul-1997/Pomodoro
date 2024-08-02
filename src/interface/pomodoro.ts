import type { currTask } from "./task";

export type WorkStatus = "pomodoroTime" | "shortBreak" | "longBreak";

export type TimerStatus = "running" | "paused" | "stopped";

export interface Pomodoro {
  remainingTime: number,
  workStatus: WorkStatus,
  timerStatus: TimerStatus,
  currentTask?: currTask
}