import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import useSettingsStore from './setting.ts';
import type { Task } from '../interface/task';

const useTaskStore = defineStore('taskStore', () => {
  const TaskList = ref<Task[]>([]);
  const currTaskCompletedPomodoro = ref<number>(0);
  const currTask = computed(() => TaskList.value.find((task) => !task.isCompleted));

  function updateTask(target: Task, isNew: boolean = false) {
    const { settingConfig } = useSettingsStore();
    // newTaskToTop
    if (isNew) {
      if (settingConfig.task.enable_newTaskToTop) {
        TaskList.value.unshift(target);
      } else {
        TaskList.value.push(target);
      }
    } else {
      // autoCheck
      if (currTask.value) {
        // if (currTask.value.id && settingConfig.task.enable_autoCheckTask) {
        // }
        if (currTask.value.totalPomodoro - currTaskCompletedPomodoro.value === 0) {
          const idx = TaskList.value.findIndex((task) => task.id === currTask.value?.id);
          if (idx !== -1) {
            TaskList.value[idx].isCompleted = true;
          }
        }
      }
      TaskList.value[TaskList.value.findIndex((task) => target.id === task.id)] = target;
    }
  }

  function removeTask(id: string) {
    const newList = TaskList.value.filter((task) => task.id !== id);
    TaskList.value = [...newList];
  }

  function completePomodoro() {
    // 确保 currTask 和 currTask.value 不为 undefined
    if (currTask.value && TaskList.value.length && currTask.value.plans?.length) {
      const planIdx = currTask.value.plans.findIndex((plan) => !plan.isCheck);

      // 确保 planIdx 和 taskIdx 的有效性
      if (planIdx !== -1) {
        const taskIdx = TaskList.value.findIndex((task) => task.id === currTask.value.id);

        if (taskIdx !== -1) {
          const plan = TaskList.value[taskIdx].plans[planIdx];

          if (plan) {
            if (plan.completedPomodoro) {
              plan.completedPomodoro++;
            } else {
              plan.completedPomodoro = 1;
            }
          }
        }
      }
    }

    // 确保 currTaskCompletedPomodoro 和 currTaskCompletedPomodoro.value 不为 undefined
    if (currTaskCompletedPomodoro.value !== undefined) {
      currTaskCompletedPomodoro.value++;
    }
  }

  return { TaskList, currTaskCompletedPomodoro, currTask, completePomodoro, updateTask, removeTask };
});

export default useTaskStore;
