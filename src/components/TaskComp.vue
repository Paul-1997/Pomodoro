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
          <input type="text" v-model.trim="task_title" placeholder="What are you working on ?"
            class="py-2 mb-4 indent-1 w-full bg-transparent border-b-2 border-b-slate-500 outline-none text-xl md:text-2xl leading-none">
          <div class="flex items-center mb-3">
            <p>Pomodoro Count :</p>
            <input type="number" class="ms-2 input-field w-16 bg-zinc-200" min="0" max="99" step="1" value="1">
          </div>
          <div class="input__extra mb-5">
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
                      <input v-model="plan.content" type="text" :id="`newPlan-content${index + 1}`"
                        class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                      <label :for="`newPlan-content${index + 1}`"
                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Plan Content
                        <br>
                      </label>
                    </div>
                    <div class="relative">
                      <input v-model="plan.pomodoro" type="number" :id="`newPlan-pomodoro${index + 1}`"
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
        <div class="input__footer px-4 py-2 text-end bg-zinc-50">
          <button type="button" role="button" class="btn bg-gray-400 me-3" @click="closeAddTask">Cancel</button>
          <button type="button" role="button" class="btn bg-green-500 px-5 disabled:bg-green-300 disabled:bg-opacity-75"
            @click="buildTask" :disabled="task_title === ''">Add</button>
        </div>
      </div>
    </div>
    <ul class="task__list bg-white bg-opacity-50 rounded px-1" v-if="useTask.TaskList.length">
      {{ useTask.TaskList }}
      {{ useTask.currTask }}
      <li v-for="task in useTask.TaskList" :key="task.id" class="pb-1 space-y-2">
        <div class="relative">
          <div class="grid grid-cols-[48px_1fr_80px_28px] items-center bg-white py-4 rounded">
            <input type="checkbox" v-model="task.isCompleted" @change="completeTask(task)"
              class="block size-5 ms-3 accent-green-600">
            <p class="text-2xl">{{ task.title }}</p>
            <span class="text-xl text-gray-400">{{ useTask.currTaskCompletedPomodoro }} /{{ task.totalPomodoro }}</span>
            <div class="absolute end-0 me-4 mt-2">
              <button type="button" @click="task.isOpen = !task.isOpen">
                <span class="material-symbols-outlined">
                  more_vert
                </span>
              </button>
              {{ useSetting.settingConfig.task.enable_autoRemoveCompleted }}
            </div>
          </div>
          <!-- plans -->
          <div class="bg-white bg-opacity-70 mx-0.5 rounded-b h-0 overflow-hidden" :class="task.isOpen ? 'h-auto' : ''">
            <ol v-if="task.plans?.length" class="py-2">
              <li v-for="plan in task.plans"
                class="grid grid-cols-[48px_1fr_60px] items-center border-b border-zinc-400 mx-2 mb-3">
                <input type="checkbox" v-model="plan.isCheck">
                <p class="text-xl">hi</p>
                <span>{{ plan.completedPomodoro ?? 0 }} /{{ plan.pomodoro }}</span>
              </li>
            </ol>
            <div class="px-4 py-2 mt-3 flex items-center justify-between border-t ">
              <button type="button" class="btn py-1 bg-red-600 hover:bg-red-700 px-5"
                @click="useTask.removeTask(task.id)">刪除</button>
              <button type="button"
                class="btn py-1 border-zinc-600 border text-zinc-600 hover:bg-zinc-600 hover:text-white transition-colors px-5"
                @click="editTask">編輯</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="min-h-36 bg-white bg-opacity-50 rounded px-1 grid place-items-center">
      <div class="*:text-lg">
        <p class="flex items-center justify-center text-cyan-800 mb-1">
          <span class="material-symbols-outlined text-cyan-800">
            description
          </span>
          TodoList為空
        </p>
        <p class="text-center text-orange-800">恭喜你完成你的代辦事項了🥂</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import getUId from '../composable/getUniqueId';
import type { Plan, Task } from '@/interface/task';
import { useTaskStore } from '@/stores/task';
import { useSettingsStore } from '@/stores/setting';


const useSetting = useSettingsStore();
const useTask = useTaskStore();

const onAddTask = ref(false);
const onAddNote = ref(false);
const onAddPlan = ref(false);
const addTask = () => onAddTask.value = true;
const addNote = () => onAddNote.value = true;
const addPlan = () => onAddPlan.value = true;

const task_title = ref('');
const notes = ref('');
const newPlans = ref([{
  content: '',
  pomodoro: 1,
  id: getUId(),
}]);


const pomodoroCount = 1;
const addNewPlan = () => newPlans.value.push({ content: '', id: getUId(), pomodoro: 1 });
const deletePlan = (id: string) => newPlans.value = newPlans.value.filter((plan: { id: string; }) => plan.id !== id);

const completeTask = (task: Task) => {
  //removeWhenCompleted
  if (useSetting.settingConfig.task.enable_autoRemoveCompleted && task.isCompleted) useTask.removeTask(task.id);
}
const buildTask = () => {

  if (pomodoroCount < 1) return false

  const task: Task = {
    id: getUId('task'),
    title: task_title.value,
    totalPomodoro: pomodoroCount,
    notes: notes.value ?? '',
    plans: newPlans.value[0].content.trim() !== '' ? [...newPlans.value] : [],
  }
  useTask.updateTask(task, true);
  closeAddTask();
};
const editTask = () => {

};

function closeAddTask() {
  onAddTask.value = false;
  onAddNote.value = false;
  onAddPlan.value = false;
  //clear data
  task_title.value = '';
  notes.value = '';
  newPlans.value = [{ content: '', id: getUId(), pomodoro: 1 }];

}
// if zero => reset
watch(newPlans, () => {
  if (newPlans.value.length < 1) {
    onAddPlan.value = false;
    newPlans.value = [{
      content: '',
      pomodoro: 1,
      id: getUId(),
    }];
  }
})
</script>