import React, { useState } from 'react';
import PostList from '../PostList';
import { SearchPost, SelectTags, SelectMinimumLikes } from '../components/FilterBlock';
import './PostPage.css';

const PostsPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [likesMin, setLikesMin] = useState(0);

    const handleTagToggle = (id: number) => {
        setSelectedTags(prev => 
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    return (
        <div className="main-content-wrapper">
            <div className="filters-sidebar">
                <SearchPost value={searchValue} onChange={setSearchValue} />
                <SelectTags selectedIds={selectedTags} onToggle={handleTagToggle} />
                <SelectMinimumLikes value={likesMin} onChange={setLikesMin} />
            </div>
            <PostList 
                searchValue={searchValue} 
                selectedTags={selectedTags} 
                likesMinimumValue={likesMin} 
            />
        </div>
    );
};

export default PostsPage;