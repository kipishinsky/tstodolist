import axios from "axios";


const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'b61c59bc-c21c-4a07-9ff4-5b299b2d5ced'
	}
}

export type GetTodolistType = {
	todolistId: string
	title: string
	addedDate: string
	order: number
}

type ResponseType<D> = {
	resultCode: number
	messages: Array<string>
	data: D
}


export const todolistsAPI = {

	getTodolists(){
		const promise = axios.get<Array<GetTodolistType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
		return promise
	},
	createTodolists(title: string) {
		const promise = axios.post < ResponseType <{item: GetTodolistType}> >  ("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
		return promise
	},
	deleteTodolists(todolistId: string) {
		const promise = axios.delete< ResponseType <{}> >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
		return promise
	},
	updateTodolistsTitle(todolistId: string, title: string) {
		const promise = axios.put< ResponseType <{}> >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
		return promise
	}
}