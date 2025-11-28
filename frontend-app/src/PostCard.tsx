import React from 'react';
import './PostCard.css'; 

import postImage from './assets/image.jpg';


interface Author { username: string; }
interface Tag { id: number; name: string; }
interface PostCardProps {
    title: string;
    description: string;
    createdAt: Date;
    author: Author;
    tag: Tag; 
    likesCount: number;
}

const PostCard: React.FC<PostCardProps> = ({ 
    title, 
    description, 
    createdAt, 
    author, 
    tag, 
    likesCount 
}) => {
    
    const formattedDate = new Date(createdAt).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="post-card">
            <div className="card-image-wrapper"> 
                <div style={{ width: '100%', height: '100%', backgroundColor: '#1a1a1a' }}></div>
                

                <img 
                    src={postImage} 
                    alt="Пташка" 
                    className="card-image" 
                />
            </div>

            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <div className="card-meta">
                    <span className="card-likes">
                        {likesCount}
                    </span>
                    <span className="card-date">{formattedDate}</span>
                </div>
            </div>
            <div className="card-footer">
                <span className="card-author">@{author.username}</span>
                <span className="card-tag">{tag.name}</span>
            </div>
        </div>
    );
};

export default PostCard;