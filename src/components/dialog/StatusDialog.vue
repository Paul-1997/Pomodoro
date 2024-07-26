<template>
  <div
    class="fixed inset-0  py-20 w-screen bg-black/60 z-[100] flex items-center justify-center overflow-y-scroll overflow-x-hidden"
    aria-hidden="true" role="dialog" @click.self="closeModal" v-if="props.isShow">
    <div class="dialog bg-white *:p-4 rounded-xl shadow-xl mt-[200px]">
      <div class="border-b border-gray-200 relative">
        <h3 class="text-4xl font-semibold text-center">說明</h3>
        <button @click="closeModal"
          class="absolute right-4 top-6 p-1 text-slate-500 hover:text-gray-700 bg-gray-300 rounded-full">
          <svg class="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="main__content">
        <h3 class="text-3xl font-bold mb-2">What is This ?</h3>
        <article class="ps-4 mb-3 text-pretty text-neutral-600 *:indent-1">
          <p>The pomodoro technique is a time management
            method that breaks work into intervals,
            traditionally 25
            minutes in
            length, separated by short breaks. This technique aims to improve productivity by maintaining focus and
            reducing
            mental fatigue.</p>
        </article>
        <h3 class="text-3xl font-bold mb-2">How to use</h3>
        <article class="ps-4 text-pretty text-neutral-600 *:indent-1">
          <ul class="usage *:mb-4 pb-3">
            <li>
              <span class="text-black font-semibold">Set a Task:</span>
              Start by adding your tasks to the todo list.
            </li>
            <li>
              <span class="text-black font-semibold">Start the Timer:</span>
              Select a task and start the pomodoro timer.

            </li>
            <li>
              <span class="text-black font-semibold">Work Interval:</span>
              Focus on your task for 25 minutes.

            </li>
            <li>
              <span class="text-black font-semibold">Short Break:</span>
              Take a short break (usually 5 minutes) after each work interval.
            </li>
            <li>
              <span class="text-black font-semibold">Repeat:</span>
              After completing four pomodoros, take a longer break (usually 15-30 minutes) before starting the
              next
              set.
            </li>
          </ul>
        </article>
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