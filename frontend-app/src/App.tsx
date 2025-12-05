import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Header from './components/Header/header';
import Main from './components/Main/main';
import Footer from './components/Footer/footer';
import HomeContent from './HomeContent'; 
import PostList from './PostList'; 



const MainLayoutWithRoutes: React.FC = () => {
    return (
        <div className="main-layout-container">
            <Header />
            <Main>
                <Routes>
                    <Route path="/" element={<HomeContent />} /> 
                    <Route path="/posts" element={<PostList />} /> 
                    <Route path="/create" element={<div>Форма створення посту</div>} />
                    <Route path="*" element={<h1>404 Сторінка не знайдена</h1>} />
                </Routes>
            </Main>
            
            <Footer />
        </div>
    );
};


const AppRouter: React.FC = () => (
    <BrowserRouter>
        <MainLayoutWithRoutes />
    </BrowserRouter>
);

export default AppRouter;