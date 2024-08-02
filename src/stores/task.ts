import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useSettingsStore } from './setting';
import type { currTask, Task } from '../interface/task';



export const useTaskStore = defineStore('taskStore',()=>{
  const TaskList =  ref<Task[]>([]);
  const currTaskCompletedPomodoro = ref<number>(0);
  const currTask = computed(()=>TaskList.value.find(task=>!task.isCompleted));

  function updateTask(target: Task, isNew: boolean = false) {
    const { settingConfig } = useSettingsStore();
    //newTaskToTop
    if(isNew){
      settingConfig.task.enable_newTaskToTop ?
      TaskList.value.unshift(target) : 
      TaskList.value.push(target);
    }
    else {
      //autoCheck
      if(currTask.value){
        if(currTask.value.id && settingConfig.task.enable_autoCheckTask){

        }
        if(currTask.value.totalPomodoro - currTaskCompletedPomodoro.value === 0){
          const idx = TaskList.value.findIndex(task=> task.id === currTask.value?.id);
          if(idx !== -1){
            TaskList.value[idx].isCompleted = true;
          }
        }
      }
      TaskList.value[TaskList.value.findIndex(task=>target.id === task.id)] = target;
    }
    
      
  };

  function removeTask(id:string){
    const newList = TaskList.value.filter(task=> task.id !== id);
    TaskList.value = [...newList];
  };

  function completePomodoro(){
      currTaskCompletedPomodoro.value++;
      console.log(currTaskCompletedPomodoro.value);
    }

  return { TaskList, currTaskCompletedPomodoro, currTask, completePomodoro, updateTask, removeTask }
});