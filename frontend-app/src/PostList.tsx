// src/PostList.tsx

import React, { useState, useEffect } from 'react';
import PostCard from './PostCard'; 
import './PostList.css'; 
// ВИПРАВЛЕНО: Використання 'import type' для імпорту інтерфейсів
import type { Post, Tag, LikeFilterOption } from './types'; 

// --- 1. КОНСТАНТИ ДЛЯ ФІЛЬТРІВ ---
const LIKE_OPTIONS: LikeFilterOption[] = [
    { value: 0, label: 'Усі пости' },
    { value: 1, label: 'Більше нуля' },
    { value: 50, label: 'Більше 50' },
    { value: 100, label: 'Більше 100' },
];

const HARDCODED_TAGS: Tag[] = [
    { id: 1, name: "Новини" }, { id: 2, name: "Програмування" }, 
    { id: 3, name: "Природа" }, { id: 4, name: "Дизайн" }, 
    { id: 5, name: "Ігри" }, { id: 6, name: "Тренування" },
];

const PostList: React.FC = () => {
    // 1. СТАНИ ДЛЯ ДАНИХ (posts, tags)
    const [posts, setPosts] = useState<Post[]>([]); 
    const [tags] = useState<Tag[]>(HARDCODED_TAGS); 

    // 2. СТАНИ ДЛЯ ФІЛЬТРІВ (searchValue, selectedTags, likesMinimumValue)
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<number[]>([]); 
    const [likesMinimumValue, setLikesMinimumValue] = useState<number>(0);

    // 3. СТАН ДЛЯ ВІДОБРАЖЕННЯ РЕЗУЛЬТАТУ
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- ФУНКЦІЯ ЗАВАНТАЖЕННЯ ДАНИХ ТА НОРМАЛІЗАЦІЯ ---
    useEffect(() => {
        const API_URL = 'http://localhost:5000/api/posts'; 
        const fetchPosts = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                
                if (response.ok && Array.isArray(data)) {
                    
                    // ВИПРАВЛЕНО: Перетворюємо рядок createdAt на об'єкт Date
                    const normalizedData: Post[] = data.map((post: any) => ({
                        ...post,
                        // Перетворення рядка дати в об'єкт Date, щоб уникнути помилки типізації
                        createdAt: new Date(post.createdAt), 
                        // Гарантуємо, що tags завжди масив (для безпеки фільтрації)
                        tags: Array.isArray(post.tags) ? post.tags : (post.tag ? [post.tag] : []),
                        likesCount: post.likesCount || 0 
                    }));
                    
                    setPosts(normalizedData);
                    setFilteredPosts(normalizedData); 
                } else {
                     setPosts([]);
                     setFilteredPosts([]);
                }
            } catch (error) {
                console.error("Помилка завантаження постів:", error);
                setPosts([]);
                setFilteredPosts([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []); 

    // --- ЛОГІКА ФІЛЬТРАЦІЇ (useEffect) ---
    // ЗАЛЕЖНОСТІ: posts + 3 стани фільтрів
    useEffect(() => {
        if (!posts) return;

        const newFilteredPosts = posts.filter(post => {
            // ФІЛЬТР 1: ПО НАЗВІ (searchValue)
            const searchLower = searchValue.toLowerCase();
            const titleMatch = post.title.toLowerCase().includes(searchLower) || 
                               post.description.toLowerCase().includes(searchLower);

            // ФІЛЬТР 2: ПО ТЕГАХ (selectedTags)
            const tagsMatch = selectedTags.length === 0 || 
                post.tags.some(tag => selectedTags.includes(tag.id));
                
            // ФІЛЬТР 3: ПО ЛАЙКАХ (likesMinimumValue)
            const likesMatch = post.likesCount >= likesMinimumValue;

            return titleMatch && tagsMatch && likesMatch;
        });

        setFilteredPosts(newFilteredPosts);

    }, [posts, searchValue, selectedTags, likesMinimumValue]);

    // --- ОБРОБНИКИ ФІЛЬТРІВ ---

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const toggleTag = (tagId: number) => {
        setSelectedTags(prevTags => {
            if (prevTags.includes(tagId)) {
                return prevTags.filter(id => id !== tagId);
            } else {
                return [...prevTags, tagId];
            }
        });
    };

    const handleLikesChange = (value: number) => {
        setLikesMinimumValue(value);
    };

    if (isLoading) {
        return (
             <div className="main-content-wrapper"><div className="posts-area">
                <h1 className="post-list-header">Завантаження постів...</h1>
            </div></div>
        );
    }

    const postCount = filteredPosts.length;

    return (
        <div className="main-content-wrapper"> 
            {/* --------------------- ФІЛЬТРИ --------------------- */}
            <div className="filters-sidebar"> 
                
                {/* ФІЛЬТР 1: ПОШУК ЗА НАЗВОЮ */}
                <div className="search-block">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Пошук"
                        value={searchValue} 
                        onChange={handleSearchChange}
                    /> 
                    {searchValue && <span className="clear-icon" onClick={() => setSearchValue('')}>❌</span>}
                </div>

                {/* ФІЛЬТР 2: ВИБЕРІТЬ ТЕГИ */}
                <h3 className="filter-heading">Виберіть Теги</h3>
                <div className="tags-container">
                    {tags.map((tag) => {
                        const isSelected = selectedTags.includes(tag.id);
                        return (
                            <button
                                key={tag.id}
                                onClick={() => toggleTag(tag.id)}
                                className={isSelected ? 'tag active' : 'tag'} 
                            >
                                {tag.name}
                                {isSelected && <span className="tag-toggle">✅</span>} 
                            </button>
                        );
                    })}
                </div>

                {/* ФІЛЬТР 3: КІЛЬКІСТЬ ЛАЙКІВ */}
                <h3 className="filter-heading">Кількість Лайків</h3>
                <div className="likes-filter-container">
                    {LIKE_OPTIONS.map(option => (
                        <button 
                            key={option.value}
                            className={likesMinimumValue === option.value ? 'like-filter-btn active' : 'like-filter-btn'}
                            onClick={() => handleLikesChange(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* ------------------- КІНЕЦЬ ФІЛЬТРІВ ------------------- */}


            <div className="posts-area">
                <h1 className="post-list-header">Всі пости ({postCount})</h1>
                
                {filteredPosts.length === 0 && !isLoading && (
                    <p>Нічого не знайдено за поточними фільтрами.</p>
                )}

                {filteredPosts.length > 0 && (
                    <div className="posts-grid">
                        {filteredPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                description={post.description}
                                // Передаємо об'єкт Date
                                createdAt={post.createdAt} 
                                author={post.author}
                                // Безпечна передача першого тегу
                                tag={post.tags.length > 0 ? post.tags[0] : { id: 0, name: "" }} 
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