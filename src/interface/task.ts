interface Task {
  title: string,
  id: string,
  totalPomodoro: number,
  note?: string,
  plans?: Array<Plan>
}

interface Plan {
  content : string,
  pomodoro: number
}

//for timer
interface currTask extends Task {
  completedPomodoro : number,
  currPlan : string,
}