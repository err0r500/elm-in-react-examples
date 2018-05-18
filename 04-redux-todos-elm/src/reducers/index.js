import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from './oldVisibilityFilter'

// just to keep the file structure
export default (elmReducer) => combineReducers({
    elmReducer,
    todos,
    visibilityFilter //: elmReducer,// uncomment to use the elm reducer
})
