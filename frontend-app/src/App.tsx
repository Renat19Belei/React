import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'; 
import HomeContent from './HomeContent';
import PostList from './PostList';

const MainLayout: React.FC = () => {
    return (
        <div className="main-layout-container"> 
            <header className="app-header">
                <div className="header-profile">
                     Профіль
                </div>
                <nav className="header-nav">
                    <Link to="/create">Створити пост</Link>
                    <Link to="/posts">Всі пости</Link>
                    <Link to="/">Головна</Link>
                </nav>
            </header>
            <main className="app-main-content">
                <Routes>
                    <Route path="/" element={<HomeContent />} /> 
                    <Route path="/posts" element={<PostList />} /> 
                    <Route path="/create" element={<div>Форма створення посту</div>} />
                    <Route path="*" element={<h1>404 Сторінка не знайдена</h1>} />
                </Routes>
            </main>
            <footer className="app-footer">
                <span></span> 
                <span></span> 
                <span></span> 
            </footer>
        </div>
    );
};


const AppRouter: React.FC = () => (
    <BrowserRouter>
        <MainLayout />
    </BrowserRouter>
);

export default AppRouter;