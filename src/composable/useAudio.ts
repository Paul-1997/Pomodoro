/* eslint-disable no-param-reassign */
import useSettingsStore from '@/stores/setting';
import { handleError } from '@/utils/errorHandler';

export default function useAudio(type: string, audio: HTMLAudioElement | null = null) {
  if (audio) {
    audio.loop = false;
    const { settingConfig } = useSettingsStore();
    
    // 根據實際類型決定文件名和音量
    const isAlarm = type === 'alarm';
    const fileName = isAlarm ? settingConfig.sound.alarmFileName : settingConfig.sound.tickFileName;
    const volume = isAlarm ? settingConfig.sound.alarmVolume : settingConfig.sound.tickVolume;
    
    audio.src = `/audio/${isAlarm ? 'alarm' : 'ticking'}/${fileName}.mp3`;
    audio.volume = volume / 100;
    
    if (type === 'ticking') {
      audio.loop = true;
    }
    
    audio.play().catch(err => {
      handleError(err, 'Audio.play');
    });
  } else if (type === 'button') {
    const clickSound = new Audio();
    clickSound.src = '/audio/buttonClick.mp3';
    clickSound.volume = 1;
    clickSound.play().catch(err => {
      handleError(err, 'Audio.buttonClick');
    });
  }
}
