<template>
  <div
    class="fixed inset-0 py-20 w-screen bg-black/60 z-[100] flex items-center justify-center overflow-y-scroll overflow-x-hidden"
    aria-hidden="true"
    role="dialog"
    @click.self="closeModal"
    v-if="props.isShow"
  >
    <div class="dialog bg-white *:p-4 rounded-xl shadow-xl">
      <div class="border-b border-gray-200 relative">
        <h3 class="text-4xl font-semibold text-center">統計</h3>
        <button
          @click="closeModal"
          class="absolute right-4 top-6 p-1 text-slate-500 hover:text-gray-700 bg-gray-300 rounded-full"
        >
          <svg class="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="main__content">
        <p class="bg-purple-400 text-white text-3xl w-fit rounded px-2">抱歉我們還在施工中，敬請期待😉</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DialogProps } from '@/interface/dialog';

const props = defineProps<DialogProps>();
const emit = defineEmits(['update:isShow']);

const closeModal = () => emit('update:isShow', false);
</script>

<style scoped></style>
