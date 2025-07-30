import { openDB } from 'idb';
import { handleError } from '@/utils/errorHandler';
import type { Task } from '@/interface/task';

const useIdxDB = async () => {
  try {
  const db = await openDB('pomodoroDB', 1, {
    upgrade(Db) {
      // task
      const task = Db.createObjectStore('taskList', { keyPath: 'id', autoIncrement: true });
      task.createIndex('currPosition', 'currIndex', { unique: false });
      // task.createIndex('titleIndex', 'title', { unique: false });
      // task.createIndex('idIndex', 'id', { unique: true });
      // task.createIndex('createAtIndex', 'createAt', { unique: false });
      // task.createIndex('updateAtIndex', 'updateAt', { unique: false });
      // task.createIndex('plansIndex', 'plans', { unique: false, multiEntry: true });
    },
  });

    const getDataById = async (id: string): Promise<Task | undefined> => {
      if (!db) throw new Error('Database not initialized');
      return await db.get('taskList', id);
    };

    const getAllData = async (): Promise<Task[]> => {
      if (!db) throw new Error('Database not initialized');
      return await db.getAllFromIndex('taskList', 'currPosition');
    };

    const deleteDataById = async (id: string): Promise<void> => {
      if (!db) throw new Error('Database not initialized');
      await db.delete('taskList', id);
    };

    const putData = async (data: Task): Promise<void> => {
      if (!db) throw new Error('Database not initialized');
      await db.put('taskList', data);
    };

    return {
      getDataById,
      getAllData,
      deleteDataById,
      putData,
    };
  } catch (error) {
    handleError(error, 'IndexedDB.initialization');
    throw error;
  }
};

export default useIdxDB;
