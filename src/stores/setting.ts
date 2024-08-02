import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getCurrZone } from '@/composable/timeZone';

const defaultSettingConfig: SettingConfig = {
  timer: {
    pomodoroTime: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    enable_autoStartBreak: false,
    enable_autoStartPomodoro: false,
  },
  task: {
    enable_autoCheckTask: true,
    enable_autoSwitchTask: true,  
    enable_newTaskToTop: false,
    enable_autoRemoveCompleted: false,
  },
  theme: {
    bgColor: {
      pomodoro: '#FF6347',
      short: 'cyan',
      long: 'green',
    },
    language: 'zh-tw',
    timeZone: getCurrZone,
    dateFormat: 'YYYY/MM/DD',
    timeFormat: '24hr',
  },
  sound: {
    enable_alarmSound: true,
    enable_tickSound: false,
    alarmVolume: 75,
    tickVolume: 75,
    alarmFileName: 'Dingdong',
    tickFileName: 'Ticking1',
  }
};
let CustomSettingConfig : SettingConfig | null = null;
export const useSettingsStore = defineStore('settingConfig', () => {
  let settingConfig = ref(CustomSettingConfig ?? defaultSettingConfig);

  function backToDefault():void{
    settingConfig.value = defaultSettingConfig;
  }
  return { settingConfig,backToDefault };
});
