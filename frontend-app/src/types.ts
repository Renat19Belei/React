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
    createdAt: Date; 
    author: User;
    tags: Tag[];   
    likesCount: number;
}

export interface LikeFilterOption {
    value: number;
    label: string;
}