import React from "react";

export const App = () => {
    return (
        <div className="app">
            <h1>Hello {process.env.APP_NAME}</h1>
            <h2>Start editing!</h2>
        </div>
    );
};
