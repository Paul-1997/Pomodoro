<template>
  <div
    class="fixed inset-0  py-20 w-screen bg-black/60 z-[100] flex items-center justify-center overflow-y-scroll overflow-x-hidden"
    aria-hidden="true" role="dialog" @click.self="closeModal" v-if="props.isShow">
    <div class="dialog bg-white *:p-4 rounded-xl shadow-xl mt-[1000px]">
      <div class="border-b border-gray-200 relative">
        <h3 class="text-4xl font-semibold text-center">設定</h3>
        <button @click="closeModal"
          class="absolute right-4 top-6 p-1 text-slate-500 hover:text-gray-700 bg-gray-300 rounded-full">
          <svg class="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="dialog__mainContent">
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none">
              timer
            </span>
            Timer
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="grid grid-cols-3 gap-x-1 md:gap-x-8">
              <div>
                <label for="" class="block text-slate-500 mb-1">Pomodoro</label>
                <input type="number" class="input-field w-full border border-slate-300"
                  v-model="settingConfig.timer.pomodoroTime">
              </div>
              <div>
                <label for="" class="block text-slate-500 mb-1">Short Break</label>
                <input type="number" class="input-field w-full border border-slate-300"
                  v-model="settingConfig.timer.shortBreak">
              </div>
              <div>
                <label for="" class="block text-slate-500 mb-1">Long Break</label>
                <input type="number" class="input-field w-full border border-slate-300"
                  v-model="settingConfig.timer.longBreak">
              </div>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Start Pomodoro</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer"
                  v-model="settingConfig.timer.enable_autoStartPomodoro">
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Start Break</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer"
                  v-model="settingConfig.timer.enable_autoStartBreak">
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <label class="block mb-1">
                Long Break interval
              </label>
              <input type="number" value="4" class="input-field w-16" v-model="settingConfig.timer.longBreakInterval">
            </li>
          </ul>
        </section>
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none">
              task
            </span>
            Task
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="flex items-center justify-between">
              <p>Auto Check Task</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer"
                  v-model="settingConfig.task.enable_autoCheckTask" />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Switch Task</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer"
                  v-model="settingConfig.task.enable_autoSwitchTask" />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>New Task To Top</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" v-model="settingConfig.task.enable_newTaskToTop" />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Remove when task completed</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer"
                  v-model="settingConfig.task.enable_autoRemoveCompleted">
                <div class="btn-toggle"></div>
              </label>
            </li>
          </ul>
        </section>
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none">
              auto_fix_high
            </span>
            Theme
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="flex items-center justify-between">
              <p>color theme</p>
              <ol class="grid grid-cols-3 gap-x-2">
                <li><a href="#" role="button" class="block size-9 rounded-md"
                    :style="{ backgroundColor: settingConfig.theme.bgColor.pomodoro }"></a></li>
                <li><a href="#" role="button" class="block size-9 rounded-md"
                    :style="{ backgroundColor: settingConfig.theme.bgColor.short }"></a></li>
                <li><a href="#" role="button" class="block size-9 rounded-md"
                    :style="{ backgroundColor: settingConfig.theme.bgColor.long }"></a></li>
              </ol>
            </li>
            <li class="flex items-center justify-between">
              <label class="me-2">Language</label>
              <select class="input-field w-full max-w-48" v-model="settingConfig.theme.language">
                <option value="zh-tw">中文(繁體)</option>
                <option value="en">English</option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label>Time Zone</label>
              <select class="input-field w-full max-w-48" v-model="settingConfig.theme.timeZone">
                <option :value="zone" v-for="zone in timeZone" :key="zone">
                  {{ formatZone(zone) }}
                </option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label>Date Format</label>
              <select class="input-field w-full max-w-48" v-model="settingConfig.theme.dateFormat">
                <option :value="type" v-for="type in dateType" :key="type">
                  {{ type }}
                </option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label class="me-2">Time Format</label>
              <select class="input-field border-none w-full max-w-28" v-model="settingConfig.theme.timeFormat">
                <option value="12hr">12-hour</option>
                <option value="24hr">24-hour</option>
              </select>
            </li>
          </ul>
        </section>
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none">
              volume_down
            </span>
            Sounds
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="flex items-center justify-between">
              <p>Enable Alarm Sound</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" v-model="settingConfig.sound.enable_alarmSound">
                <div class="btn-toggle"></div>
              </label>
            </li>
            <template v-if="settingConfig.sound.enable_alarmSound">
              <li class="flex items-center justify-between">
                <p>Alarm Sound</p>
                <select name="audioPlayer" class="input-field w-full max-w-48"
                  v-model="settingConfig.sound.alarmFileName" @change="playAudio('alarm')">
                  <option :value="audio" v-for="audio in AlarmList" :key="audio">
                    {{ audio }}
                  </option>
                </select>
              </li>
              <li class="flex items-center justify-between">
                <p>Alarm volume</p>
                <input type="range" class="input-field" v-model="settingConfig.sound.alarmVolume" min="1" max="100"
                  @change="playAudio('alarm')">
              </li>
            </template>
            <li class="flex items-center justify-between">
              <p>Enable Tick Sound</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" v-model="settingConfig.sound.enable_tickSound">
                <div class="btn-toggle"></div>
              </label>
            </li>
            <template v-if="settingConfig.sound.enable_tickSound">

              <li class="flex items-center justify-between">
                <p>Tick Sound</p>
                <select name="audioPlayer" class="input-field w-full max-w-48"
                  v-model="settingConfig.sound.tickFileName" @change="playAudio('ticking')">
                  <option :value="audio" v-for="audio in TickList" :key="audio">
                    {{ audio }}
                  </option>
                </select>
              </li>
              <li class="flex items-center justify-between">
                <p>Tick volume</p>
                <input type="range" class="input-field" v-model="settingConfig.sound.tickVolume"
                  @change="playAudio('ticking')">
              </li>
            </template>
          </ul>
        </section>
      </div>
    </div>
  </div>


</template>
<script setup lang="ts">
import { watch, ref } from 'vue';
import { useSettingsStore } from '@/stores/setting';
import { timezones, dateFormatType } from '@/assets/timeZone';
import { formatZone } from '@/helper/timeZone';
import type { DialogProps } from '@/interface/dialog';
//init
const { settingConfig, updateConfig } = useSettingsStore();
//sound
const AlarmList = ref<string[]>(['Dingdong', 'Bird', 'Cuckoo', 'Dingdingding', 'Happy jingle', 'Pikachu']);
const TickList = ref<string[]>(['Ticking1', 'Ticking2']);

const audio = new Audio();
function playAudio(type: string) {

  const fileName = type === 'alarm' ? settingConfig.sound.alarmFileName : settingConfig.sound.tickFileName;
  const volume = type === 'alarm' ? settingConfig.sound.alarmVolume : settingConfig.sound.tickVolume;

  audio.src = `src/assets/audio/${type}/${fileName}.mp3`;
  audio.volume = volume / 100;
  audio.play();
}
//timeZone
const timeZone = ref(timezones);
const dateType = ref(dateFormatType);


const props = defineProps<DialogProps>();
const emit = defineEmits(['update:isShow']);


const closeModal = () => emit('update:isShow', false);
</script>

<style scoped>
.dialog {
  width: min(664px, calc(100vw - 24px));
}
</style>