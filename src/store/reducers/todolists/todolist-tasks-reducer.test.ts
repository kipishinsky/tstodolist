import {addTodolistAC, todolistsReducer} from './todolists-reducer'
import {tasksReducer} from '../tasks/tasks-reducer'
import {TodolistsReducerType, TodolistType} from '../../../utilities/types/todolists/todolists-types'
import {AppTasksType} from '../../../utilities/types/app/app-types'

test('ids should be equals', () => {
	const startTasksState: AppTasksType = {}
	const startTodolistsState: Array<TodolistsReducerType> = []

	const todolist: TodolistType = {
		id: '3',
		title: 'new todolist',
		filter: 'All',
		addedDate: '',
		order: 0
	}

	const action = addTodolistAC({todolist})
	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.payload.todolist.id)
	expect(idFromTodolists).toBe(action.payload.todolist.id)
})
