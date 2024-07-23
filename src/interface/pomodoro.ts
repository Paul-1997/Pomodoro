
export type WorkStatus = "pomodoroTime" | "shortBreak" | "longBreak";

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