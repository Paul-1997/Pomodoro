interface SettingConfig {
  timer : {
    pomodoroTime : number,
    shortBreak: number,
    longBreak: number,
    longBreakInterval: number,
    enable_autoStartBreak : boolean,
    enable_autoStartPomodoro : boolean,
  },
  task: {
    enable_autoCheckTask : boolean,
    enable_autoSwitchTask : boolean,
    enable_newTaskToTop : boolean,
    enable_autoRemoveCompleted : boolean,
  },
  theme: {
    bgColor: {
      pomodoro: string,
      short: string,
      long: string,
    },
    language: string,
    timeZone: string,
    dateFormat: string,
    timeFormat: '12hr' | '24hr',
  },
  sound: {
    enable_alarmSound: boolean,
    enable_tickSound: boolean,
    alarmVolume: number,
    tickVolume: number,
    alarmFileName: string,
    tickFileName: string
  }
}