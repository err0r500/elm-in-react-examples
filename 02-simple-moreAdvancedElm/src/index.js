import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import AppWithContext from './appWithContext';

ReactDOM.render(
    <div>
        <App/>
        <AppWithContext/>
    </div>,
    document.getElementById('app'));