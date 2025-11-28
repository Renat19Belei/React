import React, { useState, useEffect } from 'react';
import PostCard from './PostCard'; 
import './PostList.css'; 

interface Author { username: string; }
interface Tag { id: number; name: string; }
interface Post {
    id: number;
    title: string;
    description: string;
    author: Author;
    tags: Tag[];
    createdAt: Date;
    likesCount: number;
}

const HARDCODED_TAGS: Tag[] = [
    { id: 1, name: "Новини" }, { id: 2, name: "Програмування" }, 
    { id: 3, name: "Природа" }, { id: 4, name: "Дизайн" }, 
    { id: 5, name: "Ігри" }, { id: 6, name: "Тренування" },
];

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[] | null>(null); 
    const [tags, setTags] = useState<Tag[]>(HARDCODED_TAGS); 

    useEffect(() => {
        const API_URL = 'http://localhost:5000/api/posts'; 

        const fetchPosts = async () => {
            try {
                const response = await fetch(API_URL);
                const data: Post[] = await response.json();
                
                if (response.ok) {
                    setPosts(data);
                } else {
                    setPosts([]); 
                }
            } catch (error) {
                setPosts([]);
            }
        };

        fetchPosts();
    }, []); 

    if (posts === null) {
        return (
            <div className="main-content-wrapper">
                <div className="posts-area">
                    <h1 className="post-list-header">Завантаження постів...</h1>
                </div>
            </div>
        );
    }

    const postCount = posts.length;

    return (
        <div className="main-content-wrapper"> 
            <div className="filters-sidebar"> 
                
                <div className="search-block">
                    <span className="search-icon"></span>
                    <input type="text" placeholder="Пошук"/> 
                    <span className="clear-icon"></span>
                </div>

                <h3 className="filter-heading">Виберіть Теги</h3>
                <div className="tags-container">
                    {tags.map((tag, id) => (
                        <button
                            key={id}
                            className={tag.id === 2 ? 'tag active' : 'tag'} 
                            onClick={() => console.log('Filter by:', tag.name)}
                        >
                            {tag.name}
                            {tag.id === 2 && <span className="tag-toggle"></span>} 
                        </button>
                    ))}
                </div>

                <h3 className="filter-heading">Кількість Лайків</h3>
                <div className="likes-filter-container">
                    <button className="like-filter-btn">Менше нуля</button>
                    <button className="like-filter-btn">Більше нуля</button>
                    <button className="like-filter-btn">Більше 50</button>
                    <button className="like-filter-btn">Більше 100</button>
                </div>
            </div>


            <div className="posts-area">
                <h1 className="post-list-header">Всі пости ({postCount})</h1>
                {posts.length === 0 && (
                    <>
                        <div className="posts-grid single-post-grid"> 
                            <PostCard
                                key={999} 
                                title="Пташка (для виду)"
                                description="Цей опис показує, як виглядатиме обрізаний текст. Це лише статична заглушка."
                                createdAt={new Date()}
                                author={{ username: "StaticUser" }}
                                tag={{ id: 4, name: "#Дизайн" }}
                                likesCount={1234}
                            />
                        </div>
                    </>
                )}
                
                {posts.length > 0 && (
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                description={post.description}
                                createdAt={post.createdAt}
                                author={post.author}
                                tag={post.tags[0]} 
                                likesCount={post.likesCount}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostList;