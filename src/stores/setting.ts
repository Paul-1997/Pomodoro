import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { getCurrZone } from '@/composable/timeZone';
import type { SettingConfig } from '@/interface/settings';

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
      pomodoroTime: '#CD5C5C',
      shortBreak: '#5F9EA0',
      longBreak: '#228B22',
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
  },
};
// let CustomSettingConfig:SettingConfig  = JSON.parse(localStorage.getItem('customSetting'));
const useSettingsStore = defineStore('settingConfig', () => {
  const localSetting = localStorage.getItem('customSetting');
  const customSettingConfig: SettingConfig | null = localSetting ? JSON.parse(localSetting) : null;
  // instance
  const settingConfig = ref<SettingConfig>(customSettingConfig ?? defaultSettingConfig);

  const isChange = ref(false);

  watch(
    settingConfig.value,
    () => {
      isChange.value = true;
    },
    { deep: true },
  );

  function changeSetting() {
    if (isChange.value) {
      const value = JSON.stringify(settingConfig.value);
      localStorage.setItem('customSetting', value);
      isChange.value = false;
    }
  }

  return { settingConfig, changeSetting };
});

export default useSettingsStore;
