import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {todolistsReducer} from './reducers/todolists/todolists-reducer'
import {tasksReducer} from './reducers/tasks/tasks-reducer'
import {appReducer} from './reducers/app/app-reducer'
import {authReducer} from './reducers/auth/auth-reducer'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store