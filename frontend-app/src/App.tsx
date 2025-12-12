import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="posts" element={<PostsPage />} />
                    <Route path="create" element={<div>Форма створення посту</div>} />
                    <Route path="*" element={<h1>404 Сторінка не знайдена</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;