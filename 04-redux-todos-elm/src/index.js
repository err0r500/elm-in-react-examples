import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import Elm from './reducers/VisibilityFilter'
import createElmMiddleware from 'elm-in-redux'
import {VisibilityFilters} from "./actions";

const loggerMiddleware = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}


const {sendActionsToElm, subscribeToElm} = createElmMiddleware(
    Elm.VisibilityFilter.worker(VisibilityFilters.SHOW_ALL) //Reducer is the name of your exported elm module
)

const store = createStore(rootReducer, compose(
    applyMiddleware(
        sendActionsToElm,
        loggerMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
subscribeToElm(store); // to receive messages from elm module


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);


