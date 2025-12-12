import React from 'react';
import PostList from '../PostList';

const PostsPage: React.FC = () => {
  return (
    <div className="posts-page">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}></h1>
      <PostList />
    </div>
  );
};

export default PostsPage;