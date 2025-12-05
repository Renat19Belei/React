import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
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
    );
};

export default Header;