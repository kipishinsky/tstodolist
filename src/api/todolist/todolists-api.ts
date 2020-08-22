import axios from "axios";
import {FilterValuesType} from "../../components/todolists-lists/todolist/todolists-reducer/todolists-reducer";

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

//api
export const todolistsAPI = {

	getTodolists(){
		return instance.get <Array <TodolistType> >(`todo-lists`)
	},
	createTodolists(title: string) {
		return instance.post < ResponseTodolistType <{item: TodolistType}> >  (`todo-lists`, {title: title})
	},
	deleteTodolists(todolistId: string) {
		return instance.delete< ResponseTodolistType >(`todo-lists/${todolistId}`)
	},
	updateTodolistsTitle(todolistId: string, updateTitle: string) {
		return instance.put< ResponseTodolistType >(`todo-lists/${todolistId}`, {title: updateTitle})
	}
}

//types
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
	addedDate: string
	order: number
}
type ResponseTodolistType<D={}> = {
	resultCode: number
	messages: Array<string>
	data: D
}
