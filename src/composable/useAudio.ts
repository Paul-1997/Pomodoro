import  { useSettingsStore }  from '@/stores/setting'
// tick for setting one | ticking for pomodoro one
export default function(type:string,audio:HTMLAudioElement | null){
  if(audio){
    audio.loop = false;
    if(type === 'button'){ //button or autoStart sound effect
      audio.src = 'src/assets/audio/buttonClick.mp3';
      audio.volume = 1;
    }
    else{
      const { settingConfig } = useSettingsStore();
      const fileName = type === 'tick' ? settingConfig.sound.tickFileName : settingConfig.sound.alarmFileName;
      const volume = type === 'tick' ? settingConfig.sound.tickVolume : settingConfig.sound.alarmVolume;
      audio.src = `src/assets/audio/${type === 'tick' ? 'ticking' : 'alarm'}/${fileName}.mp3`;
      audio.volume = volume / 100;
    }
    if(type === 'ticking') audio.loop = true;
    audio.play();
  }
}