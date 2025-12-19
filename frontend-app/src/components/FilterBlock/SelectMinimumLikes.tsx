import React from 'react';

interface Props {
    value: number;
    onChange: (val: number) => void;
}

const LIKE_OPTIONS = [
    { value: 0, label: 'Усі пости' },
    { value: 1, label: 'Більше нуля' },
    { value: 50, label: 'Більше 50' },
    { value: 100, label: 'Більше 100' },
];

export const SelectMinimumLikes: React.FC<Props> = ({ value, onChange }) => (
    <div className="likes-filter-container">
        <h3 className="filter-heading">Кількість Лайків</h3>
        {LIKE_OPTIONS.map(option => (
            <button 
                key={option.value}
                className={value === option.value ? 'like-filter-btn active' : 'like-filter-btn'}
                onClick={() => onChange(option.value)}
            >
                {option.label}
            </button>
        ))}
    </div>
);