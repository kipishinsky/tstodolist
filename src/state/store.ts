import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from './reducers/todolists-reducer/todolists-reducer';
import {tasksReducer} from './reducers/tasks-reducer/tasks-reducer';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer
})


export type RootStateType = ReturnType <typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store