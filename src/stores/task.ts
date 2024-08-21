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
    // 檢查當前事項下是否有未完成的計畫
    const planIdx = currTask.value?.plans?.findIndex((plan) => !plan.isCheck);
    // 取到當前項目的plan並增加番茄鐘
    if (planIdx !== -1 && planIdx !== undefined) {
      const taskIdx = TaskList.value.findIndex((task) => task.id === (currTask.value as Task).id);

      if (taskIdx !== -1 && taskIdx !== undefined) {
        if (TaskList.value[taskIdx].plans) {
          const currPlan = TaskList.value[taskIdx].plans[planIdx];
          currPlan.completedPomodoro = currPlan.completedPomodoro ? currPlan.completedPomodoro + 1 : 1;
        }
      }
    }
    // 當前完成番茄鐘+1
    currTaskCompletedPomodoro.value++;
  }

  return { TaskList, currTaskCompletedPomodoro, currTask, completePomodoro, updateTask, removeTask };
});

export default useTaskStore;
