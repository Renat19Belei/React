import React from 'react';

const HomeContent: React.FC = () => {
    return (
        <>
            <div className="info-block">
                <h2>МОЖЛИВОСТІ ТА СТОРІНКИ</h2>
                <ul>
                    <li>Аутентифікація (JWT)</li>
                    <li>Захист</li>
                    <li>CRUD-функціонал</li>
                </ul>
            </div>
            <div className="columns-container">
                <section className="backend-column">
                    <h3>BACKEND</h3>
                    <div className="lists-group">
                        <ul>
                            <li>Node.js/Express</li>
                            <li>Prisma ORM</li>
                            <li>bcrypt</li>
                        </ul>
                        <ul>
                            <li>TypeScript</li>
                            <li>JWT (jsonwebtoken)</li>
                            <li>envialid</li>
                        </ul>
                    </div>
                </section>


                <section className="frontend-column">
                    <h3>FRONTEND</h3>
                    <ul>
                        <li>React</li>
                        <li>TypeScript</li>
                    </ul>
                </section>
            </div>
        </>
    );
};

export default HomeContent;