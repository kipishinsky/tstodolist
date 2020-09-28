import React from 'react'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, combineReducers, createStore} from 'redux'

import {tasksReducer} from '../../store/reducers/tasks/tasks-reducer'
import {todolistsReducer} from '../../store/reducers/todolists/todolists-reducer'
import {appReducer} from '../../store/reducers/app/app-reducer'
import {authReducer} from '../../store/reducers/auth/auth-reducer'

import {TaskPriorities, TaskStatuses} from '../../utilities/types/todolists/tasks/tasks-type'
import {v1} from 'uuid'
import {RootStateType} from '../../store/store'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer
})

const initialGlobalState: RootStateType = {
	todolists: [
		{id: 'todolistId1', title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
		{id: 'todolistId2', title: 'What to buy', filter: 'All', entityStatus: 'loading', addedDate: '', order: 0}
	],
	tasks: {
		['todolistId1']: [
			{
				id: v1(),
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId1',
				priority: TaskPriorities.Low,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''
			},
			{
				id: v1(),
				title: 'JS',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId1',
				priority: TaskPriorities.Low,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''
			}
		],
		['todolistId2']: [
			{
				id: v1(),
				title: 'Milk',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId2',
				priority: TaskPriorities.Low,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''
			},
			{
				id: v1(),
				title: 'React Book',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId2',
				priority: TaskPriorities.Low,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''
			}
		]
	},
	app: {
		status: 'idle',
		error: null,
		initialized: false
	},
	auth: {
		isLoggedIn: false
	}
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
