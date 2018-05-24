import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

import ElmBridge from 'elm-in-redux'
import ElmModule from './reducers/VisibilityFilter'

import {VisibilityFilters} from "./actions";


const elmBridge = new ElmBridge("visibilityFilter", ElmModule.VisibilityFilter, VisibilityFilters.SHOW_ALL);

const store = createStore(
    rootReducer(elmBridge.reducer),
    compose(
        applyMiddleware(
            elmBridge.middleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

elmBridge.subscribe(store); // to receive messages from elm module


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);


