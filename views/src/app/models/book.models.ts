import { Chapter } from "./chapter.models";

export interface Tag {
    value: string,
    display: string
};

export interface Book {
    id: string,
    name: string, 
    description: string,
    author: string,
    tags: Tag[],
    views: number,
    finished: boolean,
    wallpaper: Blob,
    chapters: Chapter[],
    chaptersCount: number,
    updatedAt: string,
    createdAt: string,
    likes: number,
    userLiked: boolean,
    createdBy: string,
    openMenu: boolean,
    isCreatedByUser: boolean
};
  