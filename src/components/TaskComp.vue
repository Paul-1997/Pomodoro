<!-- eslint-disable max-len -->

<template>
  <div class="task px-4 pb-10 h-full">
    <div class="task__input mb-4">
      <button
        v-if="!onAddTask"
        @click="addTask"
        class="py-3 bg-slate-100 bg-opacity-25 border-2 border-dashed rounded-lg w-full flex items-center justify-center group text-slate-300 hover:text-slate-50 text-lg"
      >
        <span
          class="material-symbols-outlined me-1"
          style="
            font-variation-settings:
              'FILL' 1,
              'wght' 500,
              'GRAD' 200;
          "
        >
          add_circle
        </span>
        <span>新增代辦事項</span>
      </button>
      <div class="bg-white rounded-lg overflow-hidden" v-else>
        <div class="px-2">
          <input
            type="text"
            v-model.trim="taskTitle"
            placeholder="What are you working on ?"
            class="py-2 mb-4 indent-1 w-full bg-transparent border-b-2 border-b-slate-500 outline-none text-xl md:text-2xl leading-none"
          />
          <div class="flex items-center mb-3">
            <p>番茄鐘數量 :</p>
            <input type="number" class="ms-2 input-field w-16 bg-zinc-200" min="0" max="99" step="1" value="1" />
          </div>
          <div class="input__extra mb-5">
            <button type="button" role="button" v-if="!onAddNote" @click="addNote" class="btn bg-violet-500 me-3">
              + 註記
            </button>
            <textarea
              v-else
              v-model.trim="notes"
              rows="3"
              maxlength="250"
              placeholder="take some notes"
              class="bg-zinc-200 block mb-3 rounded w-full px-2 py-2 outline-none focus:ring focus:ring-gray-100"
            ></textarea>
            <button type="button" role="button" v-if="!onAddPlan" @click="addPlan" class="btn bg-violet-500">
              + 計畫
            </button>
            <div v-else class="mt-4">
              <h3 class="text-xl font-semibold" title="your plans">Plans</h3>
              <ul class="mb-8">
                <li v-for="(plan, index) in newPlans" :key="plan.id">
                  <div class="flex gap-3 mb-3 items-end">
                    <div class="relative grow">
                      <input
                        v-model="plan.content"
                        type="text"
                        :id="`newPlan-content${index + 1}`"
                        class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        :for="`newPlan-content${index + 1}`"
                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Plan Content
                        <br />
                      </label>
                    </div>
                    <div class="relative">
                      <input
                        v-model="plan.pomodoro"
                        type="number"
                        :id="`newPlan-pomodoro${index + 1}`"
                        class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-24 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        :for="`newPlan-pomodoro${index + 1}`"
                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Pomodoro
                      </label>
                    </div>
                    <a href="#" class="hover:-translate-y-0.5" role="button" @click.prevent="deletePlan(plan.id)">
                      <span class="material-symbols-outlined text-gray-400">delete</span>
                    </a>
                  </div>
                </li>
              </ul>
              <button
                type="button"
                class="w-fit mx-auto flex items-center justify-center text-gray-500 group hover:text-gray-700"
                @click="addNewPlan(newPlans)"
              >
                <span
                  class="material-symbols-outlined me-1"
                  style="
                    font-variation-settings:
                      'FILL' 1,
                      'wght' 500,
                      'GRAD' 200;
                  "
                >
                  add_circle
                </span>
                add new line
              </button>
            </div>
          </div>
        </div>
        <div class="input__footer px-4 py-2 text-end bg-zinc-50">
          <button type="button" role="button" class="btn bg-gray-400 me-3 hover:bg-gray-600" @click="closeAddTask">
            取消
          </button>
          <button
            type="button"
            role="button"
            class="btn bg-green-500 hover:bg-green-700 px-5 disabled:bg-green-300 disabled:bg-opacity-75"
            @click="buildTask"
            :disabled="taskTitle === ''"
          >
            新增
          </button>
        </div>
      </div>
    </div>
    {{ currEditTask }}
    <ul class="task__list bg-white bg-opacity-75 rounded px-1" v-if="useTask.TaskList.length">
      {{
        useTask.TaskList
      }}
      <li v-for="task in useTask.TaskList" :key="task.id" class="pb-1 space-y-2">
        <div class="relative" v-if="currEditTask.id !== task.id">
          <div class="grid grid-cols-[48px_1fr_80px_28px] items-center bg-white py-4 rounded">
            <input
              type="checkbox"
              v-model="task.isCompleted"
              @change="completeTask(task)"
              class="block size-5 ms-3 accent-green-600"
            />
            <p class="text-2xl">{{ task.title }}</p>
            <span class="text-xl text-gray-400">{{ useTask.currTaskCompletedPomodoro }} /{{ task.totalPomodoro }}</span>
            <div class="absolute end-0 me-4 mt-2">
              <button type="button" @click="task.isOpen = !task.isOpen">
                <span class="material-symbols-outlined"> more_vert </span>
              </button>
            </div>
          </div>
          <!-- plans -->
          <div class="bg-white bg-opacity-70 mx-0.5 rounded-b h-0 overflow-hidden" :class="task.isOpen ? 'h-auto' : ''">
            <ol v-if="task.plans?.length">
              <li
                v-for="plan in task.plans"
                :key="plan.id"
                class="grid grid-cols-[48px_1fr_60px] items-center border-b border-zinc-400 mx-2 mb-3"
              >
                <input type="checkbox" v-model="plan.isCheck" />
                <p class="text-xl">hi</p>
                <span>{{ plan.completedPomodoro ?? 0 }} /{{ plan.pomodoro }}</span>
              </li>
            </ol>
            <div class="px-4 py-2 mt-3 flex items-center justify-between border-t">
              <button
                type="button"
                class="btn py-1 bg-red-600 hover:bg-red-700 px-5"
                @click="useTask.removeTask(task.id)"
              >
                刪除
              </button>
              <button
                type="button"
                class="btn py-1 border-zinc-600 border text-zinc-600 hover:bg-zinc-600 hover:text-white transition-colors px-5"
                @click="currEditTask = JSON.parse(JSON.stringify(task))"
              >
                編輯
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-white rounded-lg overflow-hidden">
            <div class="px-2">
              <input
                type="text"
                v-model.trim="currEditTask.title"
                placeholder="What are you working on ?"
                class="py-2 mb-4 indent-1 w-full bg-transparent border-b-2 border-b-slate-500 outline-none text-xl md:text-2xl leading-none"
              />
              <div class="flex items-center mb-3">
                <p>番茄鐘數量 :</p>
                <input
                  type="number"
                  class="ms-2 input-field w-16 bg-zinc-200"
                  min="0"
                  max="99"
                  step="1"
                  v-model="currEditTask.totalPomodoro"
                />
              </div>
              <div class="input__extra mb-5">
                <button
                  type="button"
                  role="button"
                  v-if="!showEditNotes && currEditTask.notes?.trim() === ''"
                  @click="showEditNotes = true"
                  class="btn bg-violet-500 me-3"
                >
                  + 註記
                </button>
                <textarea
                  v-else
                  v-model.trim="currEditTask.notes"
                  rows="3"
                  maxlength="250"
                  placeholder="take some notes"
                  class="bg-zinc-200 block mb-3 rounded w-full px-2 py-2 outline-none focus:ring focus:ring-gray-100"
                  @blur="isAreaEmpty"
                ></textarea>
                <button
                  type="button"
                  role="button"
                  v-if="!showEditPlans && !currEditTask.plans?.length"
                  @click="showEditPlans = true"
                  class="btn bg-violet-500"
                >
                  + 計畫
                </button>
                <div v-else class="mt-4">
                  <h3 class="text-xl font-semibold" title="your plans">Plans</h3>
                  <ul class="mb-8">
                    <li v-for="(plan, index) in currEditTask.plans" :key="plan.id">
                      <div class="flex gap-3 mb-3 items-end">
                        <div class="relative grow">
                          <input
                            v-model="plan.content"
                            type="text"
                            :id="`newPlan-content${index + 1}`"
                            class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                          />
                          <label
                            :for="`newPlan-content${index + 1}`"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                          >
                            Plan Content
                            <br />
                          </label>
                        </div>
                        <div class="relative">
                          <input
                            v-model="plan.pomodoro"
                            type="number"
                            :id="`newPlan-pomodoro${index + 1}`"
                            class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-24 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                          />
                          <label
                            :for="`newPlan-pomodoro${index + 1}`"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                          >
                            Pomodoro
                          </label>
                        </div>
                        <a href="#" class="hover:-translate-y-0.5" role="button" @click.prevent="deletePlan(plan.id)">
                          <span class="material-symbols-outlined text-gray-400">delete</span>
                        </a>
                      </div>
                    </li>
                  </ul>
                  <button
                    type="button"
                    class="w-fit mx-auto flex items-center justify-center text-gray-500 group hover:text-gray-700"
                    @click="addNewPlan(currEditTask.plans as Plan[])"
                  >
                    <span
                      class="material-symbols-outlined me-1"
                      style="
                        font-variation-settings:
                          'FILL' 1,
                          'wght' 500,
                          'GRAD' 200;
                      "
                    >
                      add_circle
                    </span>
                    add new line
                  </button>
                </div>
              </div>
            </div>
            <div class="input__footer px-4 py-2 text-end bg-zinc-50">
              <button type="button" role="button" class="btn bg-gray-400 me-3 hover:bg-gray-600" @click="cancelEdit">
                取消
              </button>
              <button
                type="button"
                role="button"
                class="btn bg-green-500 hover:bg-green-700 px-5 disabled:bg-green-300 disabled:bg-opacity-75"
                @click="editTask"
                :disabled="currEditTask.title === ''"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="min-h-36 bg-white bg-opacity-50 rounded px-1 grid place-items-center">
      <div class="*:text-lg">
        <p class="flex items-center justify-center text-cyan-800 mb-1">
          <span class="material-symbols-outlined text-cyan-800"> description </span>
          TodoList為空
        </p>
        <p class="text-center text-orange-800">
          <span v-if="useSetting.settingConfig.task.enable_autoRemoveCompleted">恭喜你完成你的代辦事項了🥂</span>
          <span v-else>趕快來建立一個吧!💪</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import useTaskStore from '@/stores/task.ts';
import useSettingsStore from '@/stores/setting.ts';
import type { Plan, Task } from '@/interface/task';
import getUId from '../composable/getUniqueId.ts';

// store
const useSetting = useSettingsStore();
const useTask = useTaskStore();
// statue
const onAddTask = ref(false);
const onAddNote = ref(false);
const onAddPlan = ref(false);
const addTask = () => (onAddTask.value = true);
const addNote = () => (onAddNote.value = true);
const addPlan = () => (onAddPlan.value = true);

// add task
const taskTitle = ref('');
const notes = ref('');
const newPlans = ref([
  {
    content: '',
    pomodoro: 1,
    id: getUId(),
    plans: [{ content: '', pomodoroCount: 1, id: getUId() }],
  },
]);

// task > plan
const pomodoroCount = 1;
const addNewPlan = (target: Plan[]) => target.push({ content: '', id: getUId(), pomodoro: 1 });
const deletePlan = (id: string) => (newPlans.value = newPlans.value.filter((plan: { id: string }) => plan.id !== id));
function closeAddTask() {
  onAddTask.value = false;
  onAddNote.value = false;
  onAddPlan.value = false;
  // clear data
  taskTitle.value = '';
  notes.value = '';
  newPlans.value = [
    { content: '', id: getUId(), pomodoro: 1, plans: [{ content: '', pomodoroCount: 1, id: getUId() }] },
  ];
}
const buildTask = () => {
  if (pomodoroCount < 1) return false;

  const task: Task = {
    id: getUId('task'),
    title: taskTitle.value,
    totalPomodoro: pomodoroCount,
    notes: notes.value ?? '',
    plans: newPlans.value[0].content.trim() !== '' ? [...newPlans.value] : [],
  };
  useTask.updateTask(task, true);
  closeAddTask();
  return true;
};

const completeTask = (task: Task) => {
  // removeWhenCompleted
  if (useSetting.settingConfig.task.enable_autoRemoveCompleted && task.isCompleted) useTask.removeTask(task.id);
};

// edit
const currEditTask = ref<Task>({ id: '', title: '', totalPomodoro: 0 });
const showEditNotes = ref(false);
const showEditPlans = ref(false);
const isAreaEmpty = () => (showEditNotes.value = !!currEditTask.value.notes);

const editTask = () => {
  currEditTask.value.isOpen = false;
  useTask.updateTask(currEditTask.value);
  // reset statue
  showEditNotes.value = false;
  showEditPlans.value = false;
  currEditTask.value = { id: '', title: '', totalPomodoro: 0 };
};
const cancelEdit = () => (currEditTask.value = { id: '', title: '', totalPomodoro: 0 });

// reset if empty
watch(newPlans, () => {
  if (newPlans.value.length < 1) {
    onAddPlan.value = false;
    newPlans.value = [
      {
        content: '',
        pomodoro: 1,
        id: getUId(),
      },
    ];
  }
});
</script>
