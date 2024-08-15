import { openDB } from 'idb';
import type { Task } from '@/interface/task';

const useIdxDB = async () => {
  const db = await openDB('pomodoroDB', 1, {
    upgrade(Db) {
      // task
      const task = Db.createObjectStore('taskList', { keyPath: 'id' });
      task.createIndex('titleIndex', 'title', { unique: false });
      task.createIndex('idIndex', 'id', { unique: true });
      task.createIndex('createAtIndex', 'createAt', { unique: false });
      task.createIndex('updateAtIndex', 'updateAt', { unique: false });
      task.createIndex('plansIndex', 'plans', { unique: false, multiEntry: true });
    },
  });

  const getDataById = async (id: string): Promise<Task | undefined> => {
    if (!db) throw new Error('Database not initialized');
    const result = await db.get('taskList', id);
    return result;
  };

  const getAllData = async (): Promise<Task[]> => {
    if (!db) throw new Error('Database not initialized');
    const result = await db.getAll('taskList');
    return result;
  };

  const deleteDataById = async (id: string): Promise<void> => {
    if (!db) throw new Error('Database not initialized');
    await db.delete('taskList', id);
  };

  const putData = async (data: Task): Promise<void> => {
    if (!db) throw new Error('Database not initialized');
    await db.put('taskList', data);
  };

  // Return methods for usage
  return {
    getDataById,
    getAllData,
    deleteDataById,
    putData,
  };
};

export default useIdxDB;
