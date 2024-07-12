
export type WorkStatus = "work" | "short break" | "long break";

export type TimerStatus = "running" | "paused" | "stopped";

export interface Task {
  id: string;
  content: string;
  totalPomodoros: number;
  completedPomodoros: number;
}

export interface Pomodoro {
  remainingTime: number,
  currentTask: Task
}