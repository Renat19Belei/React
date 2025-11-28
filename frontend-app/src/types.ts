export interface Tag {
    id: number;
    name: string;
}

export interface User {
    id: number;
    username: string;
}

export interface Post {
    id: number;
    title: string;
    content: string; 
    description: string;
    createdAt: string;
    author: User;
    tag: Tag;
}