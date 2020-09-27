export type AppInitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status: RequestStatusType,
	// ошибку пишем сюда
	error: string | null,
	// проверяет логинизацию
	initialized: boolean
}


export type AppTasksType = {
	[key: string]: Array<TaskType>
}

export type AppPropsType = {
	demo?: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type FilterValuesType = 'All' | 'Active' | 'Completed'

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

export type TaskType = {
	id: string
	todoListId: string
	title: string
	status: TaskStatuses
	priority: TaskPriorities
	completed: boolean
	description: string
	startDate: string
	deadline: string
	order: number
	addedDate: string
}

export type UpdateTaskModelType = {
	title: string,
	description: string,
	status: TaskStatuses,
	completed: boolean,
	priority: TaskPriorities,
	startDate: string,
	deadline: string
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	High = 2,
	Urgent = 3,
	Later = 4
}

export type ResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	data: D
}

export type ResponseTasksType<D = {}> = {
	error: string | null
	totalCount: number
	data: D
	items: TaskType [] // Array<TaskType>,
	messages: string,
	resultCode: number
}

export type LoginParametersType = {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha?: string | boolean
}






