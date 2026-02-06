import type { Folder } from '../types';

// Mock Data
let folders: Folder[] = [
  { id: '1', name: 'Work', createdAt: Date.now() },
  { id: '2', name: 'Social', createdAt: Date.now() },
  { id: '3', name: 'Entertainment', createdAt: Date.now() },
];

const LATENCY = 500;

export const fetchFolders = async (): Promise<Folder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...folders]), LATENCY);
  });
};

export const createFolder = async (name: string): Promise<Folder> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFolder: Folder = {
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
      };
      folders = [...folders, newFolder];
      resolve(newFolder);
    }, LATENCY);
  });
};

export const deleteFolder = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      folders = folders.filter((f) => f.id !== id);
      resolve();
    }, LATENCY);
  });
};
