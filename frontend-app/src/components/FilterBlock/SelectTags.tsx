import React, { useState, useEffect } from 'react';
import './SelectTags.css';
import { type Tag } from '../../shared/types/tag';

interface SelectTagsProps {
    selectedIds: number[];
    onToggle: (id: number) => void;
}

export const SelectTags: React.FC<SelectTagsProps> = ({ selectedIds, onToggle }) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/tags')
            .then(res => res.json())
            .then(data => {
                setTags(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="mini-loader">Заантаження тегів...</div>;

    return (
        <div className="tags-container">
            <h3 className="filter-heading">Теги</h3>
            <div className="tags-list">
                {tags.map(tag => (
                    <button
                        key={tag.id}
                        className={selectedIds.includes(tag.id) ? 'tag active' : 'tag'}
                        onClick={() => onToggle(tag.id)}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
        </div>
    );
};