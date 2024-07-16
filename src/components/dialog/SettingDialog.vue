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
                <input type="number" class="input-field w-full border border-slate-300">
              </div>
              <div>
                <label for="" class="block text-slate-500 mb-1">Short Break</label>
                <input type="number" class="input-field w-full border border-slate-300">
              </div>
              <div>
                <label for="" class="block text-slate-500 mb-1">Long Break</label>
                <input type="number" class="input-field w-full border border-slate-300">
              </div>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Start Break</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked>
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Start Pomodoro</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked>
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Start Break</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked>
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <label class="block mb-1">
                Long Break interval
              </label>
              <input type="number" value="4" class="input-field w-16">
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
                <input type="checkbox" value="" class="sr-only peer" checked>
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Switch Task</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked>
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>New Task To Top</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked>
                <div class="btn-toggle"></div>
              </label>
            </li>
            <li class="flex items-center justify-between">
              <p>Auto Remove when task completed</p>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked>
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
                <li><a href="#" role="button" class="block size-9 rounded-md bg-red-500"></a></li>
                <li><a href="#" role="button" class="block size-9 rounded-md bg-red-500"></a></li>
                <li><a href="#" role="button" class="block size-9 rounded-md bg-red-500"></a></li>
              </ol>
            </li>
            <li class="flex items-center justify-between">
              <label class="me-2">Language</label>
              <select name="" id="" class="input-field w-full max-w-48">
                <option value="zh-tw">中文(繁體)</option>
                <option value="en">English</option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label>Time Zone</label>
              <select name="" id="" class="input-field w-full max-w-48">
                <option :value="zone" v-for="zone in timeZone" :key="zone" :selected="zone === CurrZone">
                  {{ formatZone(zone) }}
                </option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label>Time Zone</label>
              <select name="" id="" class="input-field w-full max-w-48">
                <option :value="type" v-for="type in dateType" :key="type" :selected="type === 'YYYY/MM/DD'">
                  {{ type }}
                </option>
              </select>
            </li>
            <li class="flex items-center justify-between">
              <label class="me-2">Time Format</label>
              <select name="" id="" class="input-field border-none w-full max-w-28">
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
            <audio autoplay>
              <source src="@/assets/audio/Dingdong.mp3">
            </audio>
            <!-- sound -->
            <!-- time up sound xx.mp3 ?
  timeUp volume 0 - 100

  enableTickingSound false
  tickingSoundStyle yy.mp3
  tickingSound volume 0 - 100 -->
          </h3>
          <ul class="px-2 md:px-4 *:mb-8">
            <li class="flex items-center justify-between"></li>
            <li class="flex items-center justify-between"></li>
            <li class="flex items-center justify-between"></li>
            <li class="flex items-center justify-between"></li>
            <li class="flex items-center justify-between"></li>
            <li class="flex items-center justify-between"></li>
          </ul>
        </section>
      </div>
      <div class="border-t border-gray-200 flex justify-end space-x-2">
        <button @click="closeModal" class="btn bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
        <button @click="confirm" class="btn bg-blue-500  hover:bg-blue-600">
          好喔
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { timezones, dateFormatType } from '@/assets/timeZone';
import { ref } from 'vue';

interface DialogProps {
  isShow: boolean;
}
const timeZone = ref(timezones);
const CurrZone = function () {
  // 获取当前时区偏移量，以分钟为单位
  const offset = new Date().getTimezoneOffset();

  // 将偏移量转换为小时和分钟
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;

  // 构建 UTC 偏移量字符串
  const utcOffset = `UTC${offset <= 0 ? '+' : '-'}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // 获取时区标识符
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `${utcOffset}_${timezone}`;
}();
const formatZone = (zone: string) => {
  const zoneSplit = zone.split('_');
  return `(${zoneSplit.shift()}) ${[...zoneSplit].join('')}`
}
const dateType = ref(dateFormatType);

const props = defineProps<DialogProps>();
const emit = defineEmits(['update:isShow']);
console.log(CurrZone)

// const dialogSetting = withDefaults(defineProps({

// }), {})

const closeModal = () => emit('update:isShow', false);
const confirm = () => console.log(123456)
</script>

<style scoped>
.dialog {
  width: min(664px, calc(100vw - 24px));
}
</style>
