import axios from "axios";


const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'b61c59bc-c21c-4a07-9ff4-5b299b2d5ced'
	}
}

type ResponseTasksType<D> = {
	addedDate: string
	taskId: string
	title: string
	todoListId: string
	data: {}
}

export const tasksAPI = {

	getTasks(todolistId: string){
		const promise = axios.get < ResponseTasksType <{}> > (`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
		return promise
	},
	createTask(todolistId: string, title: string) {
		const promise = axios.post < ResponseTasksType <{}> > (`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title: title}, settings)
		return promise
	},
	deleteTask(todolistId: string, taskId: string) {
		const promise = axios.delete < ResponseTasksType <{}> > (`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings)
		return promise
	},
	updateTaskTitle(todolistId: string, taskId: string, title: string) {
		const promise = axios.put < ResponseTasksType <{}> > (`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {title: title}, settings)
		return promise
	}
}