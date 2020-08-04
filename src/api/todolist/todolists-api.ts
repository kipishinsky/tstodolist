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

export type TodolistType = {
	todolistId: string
	title: string
	addedDate: string
	order: number
}

type ResponseType<D={}> = {
	resultCode: number
	messages: Array<string>
	data: D
}


export const todolistsAPI = {

	getTodolists(){
		return instance.get <Array <TodolistType> >(`todo-lists`)
	},
	createTodolists(title: string) {
		return instance.post < ResponseType <{item: TodolistType}> >  (`todo-lists`, {title: title})
	},
	deleteTodolists(todolistId: string) {
		return instance.delete< ResponseType >(`todo-lists/${todolistId}`)
	},
	updateTodolistsTitle(todolistId: string, title: string) {
		return instance.put< ResponseType >(`todo-lists/${todolistId}`, {title: title})
	}
}