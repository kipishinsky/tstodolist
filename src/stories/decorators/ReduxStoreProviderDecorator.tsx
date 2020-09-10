import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../components/todolists-lists/todolist/tasks-reducer/tasks-reducer'
import {todolistsReducer} from '../../components/todolists-lists/todolist/todolists-reducer/todolists-reducer'
import {v1} from 'uuid'
import {RootStateType} from '../../components/app/store'
import {TaskPriorities, TaskStatuses} from '../../api/tasks/tasks-api'
import {appReducer} from '../../components/app/app-reducer'
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer
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
		error: null
	}
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
	debugger
	return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
