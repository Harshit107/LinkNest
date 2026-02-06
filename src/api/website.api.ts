import type { Website } from '../types';

// Mock Data
let websites: Website[] = [
  { id: '1', folderId: '1', title: 'GitHub', url: 'https://github.com', createdAt: Date.now() },
  { id: '2', folderId: '1', title: 'Linear', url: 'https://linear.app', createdAt: Date.now() },
  { id: '3', folderId: '2', title: 'Twitter', url: 'https://twitter.com', createdAt: Date.now() },
  { id: '4', folderId: '3', title: 'YouTube', url: 'https://youtube.com', createdAt: Date.now() },
];

const LATENCY = 500;

export const fetchWebsites = async (folderId: string): Promise<Website[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = websites.filter((w) => w.folderId === folderId);
      resolve([...filtered]);
    }, LATENCY);
  });
};

export const addWebsite = async (website: Omit<Website, 'id' | 'createdAt'>): Promise<Website> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newWebsite: Website = {
        ...website,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        favicon: `https://www.google.com/s2/favicons?domain=${website.url}&sz=64`
      };
      websites = [...websites, newWebsite];
      resolve(newWebsite);
    }, LATENCY);
  });
};
