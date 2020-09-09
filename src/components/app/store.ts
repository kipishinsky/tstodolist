import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../todolists-lists/todolist/todolists-reducer/todolists-reducer';
import {tasksReducer} from '../todolists-lists/todolist/tasks-reducer/tasks-reducer';
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer
})


export type RootStateType = ReturnType <typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store