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

export type TaskType = {
	description: string
	title: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

type ResponseTasksType<D={}> = {
	error: string | null
	totalCount: number
	data: D
	item: TaskType [] // Array<TaskType>
}

export const tasksAPI = {

	getTasks(todolistId: string){
		return instance.get < ResponseTasksType > (`todo-lists/${todolistId}/tasks`)
	},
	createTask(todolistId: string, title: string) {
		return instance.post < ResponseTasksType > (`todo-lists/${todolistId}/tasks`, {title: title})
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete < ResponseTasksType > (`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTaskTitle(todolistId: string, taskId: string, title: string) {
		return instance.put < ResponseTasksType > (`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
	}
}