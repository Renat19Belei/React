import React from 'react';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export const SearchPost: React.FC<Props> = ({ value, onChange }) => (
    <div className="search-block">
        <span className="search-icon"></span>
        <input 
            type="text" 
            placeholder="Пошук"
            value={value} 
            onChange={(e) => onChange(e.target.value)}
        /> 
        {value && <span className="clear-icon" onClick={() => onChange('')}></span>}
    </div>
);