import React from 'react';
import Logo from '@/assets/images/logo.svg';

export const App = () => {
    return (
        <div className="app">
            <div className="logo">
                <Logo />
            </div>
            <h1>Hello {process.env.APP_NAME}</h1>
            <h2>Start editing!</h2>
        </div>
    );
};
