import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

import ElmBridge from 'elm-in-redux'
import ElmModule from './reducers/VisibilityFilter'

import {VisibilityFilters} from "./actions";

const loggerMiddleware = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const elmBridge = new ElmBridge(ElmModule.VisibilityFilter, VisibilityFilters.SHOW_ALL);

const store = createStore(
    rootReducer(elmBridge.reducer),
    compose(
        applyMiddleware(
            elmBridge.sendActionsToElm,
            loggerMiddleware
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


