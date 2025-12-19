import { type Tag } from './tag';
import { type User } from './user';

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