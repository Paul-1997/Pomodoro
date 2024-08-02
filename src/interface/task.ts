/*
if autocomplete 則 當前番茄到達預設番茄 及勾選完成
*/
export interface Task {
  title: string,
  id: string,
  totalPomodoro: number,
  notes?: string,
  plans?: Array<Plan> | [],
  isCompleted?: boolean,
  isOpen?: boolean
}

export interface Plan {
  content : string,
  id:string,
  pomodoro: number,
  completedPomodoro?: number
  isCheck?: boolean,
}

//for timer
export interface currTask extends Task {
  currTotalPomodoro: number,
  currPlan : Plan,
}