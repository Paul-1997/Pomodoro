<template>
  <div class="task px-4 pb-10 h-full">
    <div class="task__input mb-4">
      <button v-if="!onAddTask" @click="addTask"
        class="py-3 bg-slate-100 bg-opacity-20 border-2 border-dashed rounded-lg w-full flex items-center justify-center group text-slate-300 hover:text-slate-50 text-lg">
        <span class="material-symbols-outlined  me-1" style="font-variation-settings:'FILL' 1,'wght' 500,'GRAD' 200">
          add_circle
        </span>
        <span>Add Task</span>
      </button>
      <div class=" bg-white rounded-lg overflow-hidden" v-else>
        <div class="px-2">
          <input type="text" v-model.trim="task_title"placeholder="What are you working on ?"
          class="py-2 mb-4 indent-1 w-full bg-transparent border-b-2 border-b-slate-500 outline-none text-2xl leading-none">
        <div class="flex items-center mb-3">
          <p>Pomodoro Count :</p>
          <input type="number" class="ms-2 input-field w-16 bg-zinc-200" min="0" max="99" step="1" value="1">
        </div>
        <div class="input__extra mb-10">
          <button type="button" role="button" v-if="!onAddNote" @click="addNote" class="btn bg-violet-400 me-3">add
            Note</button>
          <textarea v-else v-model.trim="notes" rows="3" maxlength="250" placeholder="take some notes"
            class="bg-zinc-200 block mb-3 rounded w-full px-2 py-2 outline-none focus:ring focus:ring-gray-100"></textarea>
          <button type="button" role="button" v-if="!onAddPlan" @click="addPlan" class="btn bg-violet-400">add
            Plan</button>
          <div v-else class="mt-4">
            <h3 class="text-xl font-semibold" title="your plans">Plans</h3>
            <ul class="mb-8">
              <li v-for="(plan, index) in newPlans" :key="plan.id">
                <div class="flex gap-3 mb-3 items-end">
                  <div class="relative grow">
                    <input type="text" :id="`newPlan-content${index + 1}`"
                      class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" " />
                    <label :for="`newPlan-content${index + 1}`"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Plan Content{{ plan.id }}
                    </label>
                  </div>
                  <div class="relative">
                    <input type="number" :id="`newPlan-pomodoro${index + 1}`"
                      class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-24 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" " />
                    <label :for="`newPlan-pomodoro${index + 1}`"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Pomodoro
                    </label>
                  </div>
                  <a href="#" class="hover:-translate-y-0.5" role="button" @click.prevent="deletePlan(plan.id)">
                    <span class="material-symbols-outlined text-gray-400">delete</span>
                  </a>
                </div>
              </li>
            </ul>
            <button type="button"
              class="w-fit mx-auto flex items-center justify-center text-gray-500 group hover:text-gray-700"
              @click="addNewPlan">
              <span class="material-symbols-outlined  me-1"
                style="font-variation-settings:'FILL' 1,'wght' 500,'GRAD' 200">
                add_circle
              </span>
              add new line
            </button>
          </div>

        </div>
        
        </div>
        <div class="input__footer px-4 py-2 text-end bg-zinc-300">
          <button type="button" role="button" class="btn bg-gray-400 me-3" @click="cancelAddTask">Cancel</button>
          <button type="button" role="button" class="btn bg-green-500 px-5">Add</button>
        </div>
      </div>
    </div>
    <div class="task__list bg-white bg-opacity-50 rounded">
      <p class="py-10">this is a task</p>
      <p class="py-10">this is a task</p>
      <p class="py-10">this is a task</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import PomodoroComp from './PomodoroComp.vue';


const onAddTask = ref(false);
const onAddNote = ref(false);
const onAddPlan = ref(false);
const addTask = () => onAddTask.value = true;
const addNote = () => onAddNote.value = true;
const addPlan = () => onAddPlan.value = true;

const task_title = ref('');
const notes = ref('');
const defaultPlan  = {
  content: '',
  pomodoro: 1,
  id: `newPlan_0`,
}
const newPlans = ref([defaultPlan]);
const pomodoroCount = 100;
const addNewPlan = () => newPlans.value.push({ content: "", pomodoro: 1, id: `newPlan_${newPlans.value.length}` });
const deletePlan = (id: string) => newPlans.value = newPlans.value.filter(plan => plan.id !== id);
const submitTask = () => {
  const task = {
    title :　task_title.value,
    pomodoroCount : pomodoroCount,
    notes: notes.value ?? '',
    plans: newPlans.value[0].content.trim() !== '' ? [...newPlans.value] : [],
  }
  buildTask(task);
}
function buildTask(task:object){

}
const cancelAddTask = () => {
  onAddTask.value = false;
  onAddNote.value = false;
  onAddPlan.value = false;
  //clear data
  task_title.value = '';
  notes.value = '';
  newPlans.value = [defaultPlan];
}
// if zero => reset
watch(newPlans, () => {
  if (newPlans.value.length < 1) {
    onAddPlan.value = false;
    newPlans.value = [{
      content: '',
      pomodoro: 1,
      id: `newPlan_0`,
    }];
  }
})
</script>
<style scoped></style>