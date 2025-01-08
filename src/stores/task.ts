import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import useIdxDB from '@/composable/useIdxDb';
import useSettingsStore from './setting';
import type { Task } from '../interface/task';

const useTaskStore = defineStore('taskStore', () => {
  const TaskList = ref<Task[]>([]);
  const currTaskCompletedPomodoro = ref<number>(0);
  const currTask = computed(() => TaskList.value.find((task) => !task.isCompleted));

  async function initIdbData() {
    try {
      const db = await useIdxDB();
      const request = await db.getAllData();
      TaskList.value = [...request];
    } catch (err) {
      // console.log('something wrong!!');
    }
  }

  // getDataFromIDB
  initIdbData();

  async function saveTaskToIdb(task: Task, currIndex: number) {
    try {
      const db = await useIdxDB();
      const serializedTask = JSON.parse(JSON.stringify(task));
      if (!serializedTask.currIndex || serializedTask.currIndex > -1) serializedTask.currIndex = currIndex;
      await db.putData(serializedTask);
    } catch (err) {
      // alert('暫存資料發生錯誤了🥺');
      // console.log(err);
    }
  }
  async function deleteIdbTask(id: string) {
    try {
      const db = await useIdxDB();
      await db.deleteDataById(id);
      // console.log('nice bro');
    } catch (err) {
      // alert('刪除暫存資料發生錯誤了');
      // console.log(err);
    }
  }

  function updateTask(target: Task, isNew: boolean = false) {
    const { settingConfig } = useSettingsStore();
    // 因應Idb所以要先把負數過濾掉才會是正確的
    const index = TaskList.value.filter((tk) => tk.currIndex! > -1).findIndex((item) => item.id === target.id);
    let currIndex = index === -1 ? TaskList.value.length : index;
    // newTaskToTop
    if (isNew) {
      if (settingConfig.task.enable_newTaskToTop) {
        // newTask用負數讓idb能夠排序
        if (currIndex !== 0) currIndex *= -1;
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
    saveTaskToIdb({ ...target }, currIndex);
  }

  function removeTask(id: string) {
    const newList = TaskList.value.filter((task) => task.id !== id);
    TaskList.value = [...newList];
    deleteIdbTask(id);
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
    // 保存新的進度到idb
    if (currTask.value) {
      const target = currTask.value;
      const currIndex = TaskList.value.findIndex((item) => item.id === target.id);
      saveTaskToIdb(currTask.value, currIndex);
    }
    // 當前完成番茄鐘+1
    currTaskCompletedPomodoro.value++;
  }

  return { TaskList, currTaskCompletedPomodoro, currTask, completePomodoro, updateTask, removeTask };
});

export default useTaskStore;
