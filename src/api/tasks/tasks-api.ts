import axios from "axios";


const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'b61c59bc-c21c-4a07-9ff4-5b299b2d5ced'
	}
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings
})

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

type ResponseTasksType<D={}> = {
	error: string | null
	totalCount: number
	data: D
	items: TaskType [] // Array<TaskType>
}



export const tasksAPI = {

	getTasks(todolistId: string) {
		return instance.get < ResponseTasksType > (`todo-lists/${todolistId}/tasks`)
	},
	createTask(newTitle: string, todolistId: string) {
		debugger
		return instance.post < ResponseTasksType<{item:TaskType}> > (`todo-lists/${todolistId}/tasks`, {title: newTitle})
	},
	deleteTask(taskId: string, todolistId: string ) {
		debugger
		return instance.delete < ResponseTasksType > (`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTaskTitle(todolistId: string, taskId: string, updateTitleTask: string) {
		return instance.put < ResponseTasksType > (`todo-lists/${todolistId}/tasks/${taskId}`, {title: updateTitleTask})
	}
}