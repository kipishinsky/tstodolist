import axios from "axios";

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'e5aceb3f-c727-470c-862e-3ea92a474b0d'
	}
}
const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings
})

//api
export const tasksAPI = {

	getTasks(todolistId: string) {
		return instance.get < ResponseTasksType > (`todo-lists/${todolistId}/tasks`)
	},
	createTask(newTitle: string, todolistId: string) {
		return instance.post < ResponseTasksType<{item:TaskType}> > (`todo-lists/${todolistId}/tasks`, {title: newTitle})
	},
	deleteTask(taskId: string, todolistId: string ) {
		return instance.delete < ResponseTasksType > (`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTaskTitle(taskId: string, status: UpdateTaskModelType, todolistId: string,) {
		return instance.put < ResponseTasksType > (`todo-lists/${todolistId}/tasks/${taskId}`, status)
	}
}

//types
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
export type ResponseTasksType<D={}> = {
	error: string | null
	totalCount: number
	data: D
	items: TaskType [] // Array<TaskType>,
	messages: string,
	resultCode: number
}