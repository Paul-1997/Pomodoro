/*
if autocomplete 則 當前番茄到達預設番茄 及勾選完成
*/

export interface Plan {
  content: string;
  id: string;
  pomodoro: number;
  completedPomodoro?: number;
  isCheck?: boolean;
}
export interface Task {
  title: string;
  id: string;
  totalPomodoro: number;
  completedPomodoro?: number;
  notes?: string;
  plans?: Array<Plan> | [];
  isCompleted?: boolean;
  isOpen?: boolean;
  currIndex?: number;
}

// for timer
export interface CurrTask extends Task {
  currTotalPomodoro: number;
  currPlan: Plan;
}
