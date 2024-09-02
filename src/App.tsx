import React from 'react';
import Logo from '@/assets/images/logo.svg';

export const App = () => {
    return (
        <div className="app">
            <div className="logo">
                <Logo />
            </div>
            <h1>{process.env.APP_NAME}</h1>
            <p>Start coding!</p>
            <code>Mode: {process.env.NODE_ENV}</code>
            <code>Version: v{process.env.npm_package_version}</code>
        </div>
    );
};
