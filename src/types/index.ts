export interface Website {
  id: string;
  title: string;
  url: string;
  folderId: string;
  favicon?: string;
  createdAt: number;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: number;
}
