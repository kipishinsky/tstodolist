export type TaskPropsType = {
	task: TaskType
	todolistId: string
	changeTaskStatus: (tasksId: string, status: TaskStatuses, todoListsId: string) => void // меняет галку таски
	changeTaskTitle: (tasksId: string, tasksTitle: string, todoListsId: string) => void   // меняет название таски
	removeTask: (todoListsId: string, tasksId: string,) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает
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

export type ResponseTasksType<D = {}> = {
	error: string | null
	totalCount: number
	data: D
	items: TaskType []
	messages: string
	resultCode: number
}

export type UpdateDomainTaskType = {
	title?: string,
	description?: string,
	status?: TaskStatuses,
	priority?: TaskPriorities,
	startDate?: string,
	deadline?: string
}

