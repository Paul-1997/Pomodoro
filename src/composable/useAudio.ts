/* eslint-disable no-param-reassign */
import useSettingsStore from '@/stores/setting';
// tick for setting one | ticking for pomodoro one
export default function useAudio(type: string, audio: HTMLAudioElement | null = null) {
  if (audio) {
    audio.loop = false;
    const { settingConfig } = useSettingsStore();
    const fileName = type !== 'alarm' ? settingConfig.sound.tickFileName : settingConfig.sound.alarmFileName;
    const volume = type === 'tick' ? settingConfig.sound.tickVolume : settingConfig.sound.alarmVolume;
    audio.src = `/audio/${type !== 'alarm' ? 'ticking' : 'alarm'}/${fileName}.mp3`;
    audio.volume = volume / 100;
    if (type === 'ticking') audio.loop = true;
    audio.play();
  } else if (type === 'button') {
    // button or autoStart sound effect
    const clickSound = new Audio();
    clickSound.src = `/audio/buttonClick.mp3`;
    clickSound.volume = 1;
    clickSound.play();
  }
}
