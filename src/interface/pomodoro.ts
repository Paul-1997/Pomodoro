import type { CurrTask } from './task';

export type WorkStatus = 'pomodoroTime' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'running' | 'paused' | 'stopped';

export interface Pomodoro {
  remainingTime: number;
  workStatus: WorkStatus;
  timerStatus: TimerStatus;
  currentTask?: CurrTask;
}

export interface TimerConfig {
  pomodoroTime: number; // in minutes
  shortBreakTime: number; // in minutes
  longBreakTime: number; // in minutes
  longBreakInterval: number; // number of pomodoros before long break
}

export interface TimerProgress {
  current: number;
  total: number;
  percentage: number;
}

export type TimerAction = 'start' | 'pause' | 'stop' | 'skip' | 'reset';

export interface TimerEvent {
  type: 'start' | 'pause' | 'stop' | 'complete' | 'break-start' | 'break-complete';
  timestamp: number;
  data?: any;
}