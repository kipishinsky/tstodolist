import {TaskStatuses, TaskType} from './tasks/tasks-type'
import {RequestStatusType} from '../error-status/err-st-types'

export type TodolistsReducerType = TodolistType & {
	filter: FilterValuesType,
	entityStatus: RequestStatusType
}

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
	addedDate: string
	order: number
}

export type TodolistPropsType = {
	todolist: TodolistsReducerType
	tasks: Array<TaskType>
	removeTask: (todoListsId: string, tasksId: string,) => void
	changeFilterTodoist: (id: string, filterValue: FilterValuesType) => void
	addNewTask: (tasksNewTitleInput: string, todoListId: string) => void
	changeTaskStatus: (tasksId: string, status: TaskStatuses, todoListsId: string) => void
	changeTaskTitle: (tasksId: string, tasksTitle: string, todoListsId: string) => void
	removeTodoList: (todoListsId: string) => void
	changeTodoListTitle: (todoListsId: string, newChangeTitleValue: string) => void
	demo?: boolean
}

export type TodolistsListPropsType = {
	demo?: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'
