import { Chapter } from "./chapter.models";

export interface Book {
    id: string,
    name: string, 
    description: string,
    author: string,
    type: [],
    views: number,
    finished: boolean,
    wallpaper: Blob,
    chapters: Chapter[],
    chaptersCount: number,
    updatedAt: string,
    createdAt: string,
    liked: boolean
};
  