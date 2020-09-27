import {combineReducers} from 'redux'
import {todolistsReducer} from '../todolists-lists/todolist/todolists-reducer/todolists-reducer'
import {tasksReducer} from '../todolists-lists/todolist/tasks-reducer/tasks-reducer'
import {appReducer} from './app-reducer'
import {authReducer} from '../login/auth-reducer'
import thunkMiddleware from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store