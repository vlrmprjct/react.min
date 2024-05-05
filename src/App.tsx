import React from 'react';
import { Button, Icon, InfoText } from '@billomat/ui';

export const App = () => {
    return (
        <div className="app">
            <h1>Hello {process.env.APP_NAME}</h1>
            <h2>Start editing!</h2>
            <br />
            <br />
            <Button iconPrefix="trash" size="small">Click me</Button>
            <br />
            <Icon icon="trash" size="medium" />
            <br />
            <InfoText>Some info text</InfoText>
        </div>
    );
};
