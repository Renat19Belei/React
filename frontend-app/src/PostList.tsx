import React, { useState, useEffect } from 'react';
import PostCard from './PostCard'; 
import './PostList.css';
import { type Post } from './shared/types/post';

interface PostListProps {
    searchValue: string;
    selectedTags: number[];
    likesMinimumValue: number;
}

const PostList: React.FC<PostListProps> = ({ searchValue, selectedTags, likesMinimumValue }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts');
                if (!response.ok) throw new Error('не вдалося завантажити дані');
                const data = await response.json();
                setPosts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const filtered = posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchValue.toLowerCase());
            const matchesTags = selectedTags.length === 0 || post.tags?.some(t => selectedTags.includes(t.id));
            const matchesLikes = (post.likesCount || 0) >= likesMinimumValue;
            return matchesSearch && matchesTags && matchesLikes;
        });
        setFilteredPosts(filtered);
    }, [posts, searchValue, selectedTags, likesMinimumValue]);

    if (isLoading) return (
        <div className="status-container">
            <div className="loader-spinner"></div>
            <p>Завантаження...</p>
        </div>
    );

    if (error) return (
        <div className="status-container">
            <div className="error-card">
                <span></span>
                <p>Помлка: {error}</p>
            </div>
        </div>
    );

    return (
        <div className="posts-area">
            <h1 className="post-list-header">Пости: {filteredPosts.length}</h1>
            <div className="posts-grid">
                {filteredPosts.map(post => (
                    <PostCard key={post.id} {...post} tag={post.tags?.[0]} />
                ))}
            </div>
        </div>
    );
};

export default PostList;