import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from './oldVisibilityFilter'
import {createElmReducer} from 'elm-in-redux'
import {VisibilityFilters} from "../actions";


export default combineReducers({
    elmReducer: createElmReducer(VisibilityFilters.SHOW_ALL),
    todos,
    visibilityFilter
})
