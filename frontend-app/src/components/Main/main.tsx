import React, { type ReactNode } from 'react';


interface MainProps {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="app-main-content">
            {children}
        </main>
    );
};

export default Main;