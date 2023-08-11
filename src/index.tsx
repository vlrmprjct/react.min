import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import'./scss/index.scss';

const root = document.body.querySelector('[data-root]');

if (!root) {
    throw new Error('Could not find root element!');
}

const rootElement = createElement(App);
createRoot(root).render(rootElement);
