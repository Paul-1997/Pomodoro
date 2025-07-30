<template>
  <div
    class="fixed inset-0 py-20 w-screen bg-black/40 z-[100] flex items-center justify-center overflow-y-scroll overflow-x-hidden"
    aria-hidden="true"
    role="dialog"
    @click.self="onPickingColor ? '' : closeModal"
    v-if="props.isShow"
  >
    <div class="dialog bg-white *:p-4 rounded-xl shadow-xl mt-[900px]" v-if="!onPickingColor">
      <div class="border-b border-gray-200 relative">
        <h3 class="text-4xl font-semibold text-center">設定</h3>
        <button
          @click="closeModal"
          class="absolute right-4 top-6 p-1 text-slate-500 hover:text-gray-700 bg-gray-300 rounded-full"
        >
          <svg class="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="dialog__mainContent">
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none"> timer </span>
            Timer
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="grid grid-cols-3 gap-x-1 md:gap-x-8">
              <div>
                <label for="" class="block text-slate-500 mb-1">Pomodoro</label>
                <input
                  type="number"
                  class="input-field w-full border border-slate-300"
                  v-model="useSetting.settingConfig.timer.pomodoroTime"
                />
              </div>
              <div>
                <label for="" class="block text-slate-500 mb-1">Short Break</label>
                <input
                  type="number"
                  class="input-field w-full border border-slate-300"
                  v-model="useSetting.settingConfig.timer.shortBreak"
                />
              </div>
              <div>
                <label for="" class="block text-slate-500 mb-1">Long Break</label>
                <input
                  type="number"
                  class="input-field w-full border border-slate-300"
                  v-model="useSetting.settingConfig.timer.longBreak"
                />
              </div>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Start Pomodoro</p>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="useSetting.settingConfig.timer.enable_autoStartPomodoro"
                />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Start Break</p>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="useSetting.settingConfig.timer.enable_autoStartBreak"
                />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <label class="block mb-1"> Long Break interval </label>
              <input
                type="number"
                value="4"
                class="input-field w-16"
                v-model="useSetting.settingConfig.timer.longBreakInterval"
              />
            </li>
          </ul>
        </section>
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none"> task </span>
            Task
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="flex items-center justify-between">
              <p>Auto Check Task</p>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="useSetting.settingConfig.task.enable_autoCheckTask"
                />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Switch Task</p>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="useSetting.settingConfig.task.enable_autoSwitchTask"
                />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>New Task To Top</p>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="useSetting.settingConfig.task.enable_newTaskToTop"
                />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Remove when task completed</p>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="useSetting.settingConfig.task.enable_autoRemoveCompleted"
                />
                <div class="btn-toggle"></div>
              </label>
            </li>
          </ul>
        </section>
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none"> auto_fix_high </span>
            Theme
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="flex items-center justify-between">
              <p>color theme</p>
              <ol class="grid grid-cols-3 gap-x-2">
                <li>
                  <a
                    href="#"
                    role="button"
                    class="block size-9 rounded-md"
                    :style="{ backgroundColor: useSetting.settingConfig.theme.bgColor.pomodoroTime }"
                    @click="changeBgColor('pomodoroTime')"
                  ></a>
                </li>
                <li>
                  <a
                    href="#"
                    role="button"
                    class="block size-9 rounded-md"
                    :style="{ backgroundColor: useSetting.settingConfig.theme.bgColor.shortBreak }"
                    @click="changeBgColor('shortBreak')"
                  ></a>
                </li>
                <li>
                  <a
                    href="#"
                    role="button"
                    class="block size-9 rounded-md"
                    :style="{ backgroundColor: useSetting.settingConfig.theme.bgColor.longBreak }"
                    @click="changeBgColor('longBreak')"
                  ></a>
                </li>
              </ol>
            </li>
            <!-- 施工中⛏️⛏️⛏️
            <li class="flex items-center justify-between">
              <label class="me-2">Language</label>
              <select class="input-field w-full max-w-48" v-model="useSetting.settingConfig.theme.language">
                <option value="zh-tw">中文(繁體)</option>
                <option value="en">English</option>
              </select>
            </li>
            -->
            <li class="flex items-center justify-between">
              <label>Time Zone</label>
              <select class="input-field w-full max-w-48" v-model="useSetting.settingConfig.theme.timeZone">
                <option :value="zone" v-for="zone in timeZone" :key="zone">
                  {{ formatZone(zone) }}
                </option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label>Date Format</label>
              <select class="input-field w-full max-w-48" v-model="useSetting.settingConfig.theme.dateFormat">
                <option :value="type" v-for="type in dateType" :key="type">
                  {{ type }}
                </option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label class="me-2">Time Format</label>
              <select
                class="input-field border-none w-full max-w-28"
                v-model="useSetting.settingConfig.theme.timeFormat"
              >
                <option value="12hr">12-hour</option>
                <option value="24hr">24-hour</option>
              </select>
            </li>
          </ul>
        </section>
        <section>
          <h3 class="flex items-center text-2xl text-slate-400 uppercase mb-3 md:mb-6">
            <span class="material-symbols-outlined me-1 text-3xl leading-none"> volume_down </span>
            Sounds
          </h3>
          <audio ref="audio"></audio>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="flex items-center justify-between">
              <p>Enable Alarm Sound</p>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  v-model="useSetting.settingConfig.sound.enable_alarmSound"
                />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <template v-if="useSetting.settingConfig.sound.enable_alarmSound">
              <li class="flex items-center justify-between">
                <p>Alarm Sound</p>
                <select
                  name="audioPlayer"
                  class="input-field w-full max-w-48"
                  v-model="useSetting.settingConfig.sound.alarmFileName"
                  @change="playAudio('alarm')"
                >
                  <option :value="audio" v-for="audio in AlarmList" :key="audio">
                    {{ audio }}
                  </option>
                </select>
              </li>
              <li class="flex items-center justify-between">
                <p>Alarm volume</p>
                <input
                  type="range"
                  class="input-field"
                  v-model="useSetting.settingConfig.sound.alarmVolume"
                  min="1"
                  max="100"
                  @change="playAudio('alarm')"
                />
              </li>
            </template>
            <li class="flex items-center justify-between">
              <p>Enable Tick Sound</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" v-model="useSetting.settingConfig.sound.enable_tickSound" />
                <div class="btn-toggle"></div>
              </label>
            </li>
            <template v-if="useSetting.settingConfig.sound.enable_tickSound">
              <li class="flex items-center justify-between">
                <p>Tick Sound</p>
                <select
                  name="audioPlayer"
                  class="input-field w-full max-w-48"
                  v-model="useSetting.settingConfig.sound.tickFileName"
                  @change="playAudio('tick')"
                >
                  <option :value="audio" v-for="audio in TickList" :key="audio">
                    {{ audio }}
                  </option>
                </select>
              </li>
              <li class="flex items-center justify-between">
                <p>Tick volume</p>
                <input
                  type="range"
                  class="input-field"
                  v-model="useSetting.settingConfig.sound.tickVolume"
                  @change="playAudio('ticking')"
                />
              </li>
            </template>
          </ul>
        </section>
      </div>
    </div>
    <div id="colorPicker" v-else class="bg-gray-50 w-80 rounded-md">
      <h2 class="text-center py-3 border-b-2 border-zinc-400">
        將
        <strong class="text-lg px-0.5">{{ getColorText(currColorType) }}</strong>
        的顏色設定為 :
      </h2>
      <div class="colorPicker__body">
        <ol class="flex flex-wrap gap-3 justify-center items-center p-5">
          <li
            v-for="color in colorList"
            :key="`bg-${color}`"
            class="size-8 rounded-md cursor-pointer"
            :style="{ 'background-color': color }"
            :class="isCurrBgColor(color)"
            @click="chooseColor(color)"
          ></li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import useSettingsStore from '@/stores/setting';
import useAudio from '@/composable/useAudio';
import { timezones, dateFormatType } from '@/assets/timeZone';
import { formatZone } from '@/utils/timeZone';
import type { DialogProps } from '@/interface/dialog';
import type { WorkStatus } from '@/interface/pomodoro';
// init
const useSetting = useSettingsStore();
// 確保不會因為數值小於0或格式不正確引發計時器異常行為
const validateValue = (v: any) => {
  if (typeof v !== 'number' || v < 0) return 1;
  return v;
};
watchEffect(() => {
  useSetting.settingConfig.timer.pomodoroTime = validateValue(useSetting.settingConfig.timer.pomodoroTime);
  useSetting.settingConfig.timer.shortBreak = validateValue(useSetting.settingConfig.timer.shortBreak);
  useSetting.settingConfig.timer.longBreak = validateValue(useSetting.settingConfig.timer.longBreak);
  useSetting.settingConfig.timer.longBreakInterval = validateValue(useSetting.settingConfig.timer.longBreakInterval);
});

// sound
const audio = ref(null);
const playAudio = (type: string) => {
  useAudio(type, audio.value);
};
// changeBg
const colorList = [
  '#CD5C5C', // Indian Red
  '#5F9EA0', // Cadet Blue
  '#228B22', // Forest Green
  '#4682B4', // Steel Blue
  '#FF69B4', // Hot Pink
  '#BA55D3', // Medium Orchid
  '#20B2AA', // Light Sea Green
  '#9370DB', // Medium Purple
  '#518a58', // Dark Sea Green
  '#B8860B', // Dark Goldenrod
  '#8B4513', // Saddle Brown
  '#708090', // Slate Gray,
  // "#FF8C69", // Salmon
];

const currColorType = ref<WorkStatus>('pomodoroTime');
const isCurrBgColor = (color: string) => {
  const curr = useSetting.settingConfig.theme.bgColor[currColorType.value];
  return curr === color ? 'ring ring-currentColor' : '';
};
const onPickingColor = ref(false);
function getColorText(type: string = 'pomodoro') {
  if (type === 'long') return '長休息';
  if (type === 'short') return '短休息';
  return '番茄鐘';
}
function changeBgColor(type: WorkStatus) {
  onPickingColor.value = true;
  currColorType.value = type;
}
function chooseColor(color: string) {
  // change Setting
  if (currColorType.value === 'pomodoroTime') useSetting.settingConfig.theme.bgColor.pomodoroTime = color;
  if (currColorType.value === 'shortBreak') useSetting.settingConfig.theme.bgColor.shortBreak = color;
  if (currColorType.value === 'longBreak') useSetting.settingConfig.theme.bgColor.longBreak = color;
  onPickingColor.value = false;
}

const AlarmList = ref<string[]>(['Dingdong', 'Bird', 'Cuckoo', 'Dingdingding', 'Happy jingle', 'Pikachu']);
const TickList = ref<string[]>(['Ticking1', 'Ticking2']);
// timeZone
const timeZone = ref(timezones);
const dateType = ref(dateFormatType);

const props = defineProps<DialogProps>();
const emit = defineEmits(['update:isShow']);

const closeModal = () => {
  useSetting.changeSetting();
  emit('update:isShow', false);
};
</script>
