import React from 'react';
import './PostCard.css'; 
import postImage from './assets/image.jpg';
import { type Post } from './shared/types/post';
import { type Tag } from './shared/types/tag';



interface PostCardProps extends Post {
    tag?: Tag; 
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
                <img src={postImage} alt={title} className="card-image" />
            </div>

            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <div className="card-meta">
                    <span className="card-likes">{likesCount}</span>
                    <span className="card-date">{formattedDate}</span>
                </div>
            </div>
            <div className="card-footer">
                <span className="card-author">@{author?.username}</span>

                <span className="card-tag">{tag?.name || 'Без тегу'}</span>
            </div>
        </div>
    );
};

export default PostCard;