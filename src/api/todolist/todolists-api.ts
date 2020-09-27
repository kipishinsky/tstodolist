import {instance} from '../../common/setting-api'
import {TodolistType, ResponseType} from '../../common/types'

export const todolistsAPI = {
	getTodolists() {
		return instance.get <Array<TodolistType>>(`todo-lists`)
	},
	createTodolists(title: string) {
		return instance.post <ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: title})
	},
	deleteTodolists(todolistId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
	},
	updateTodolistsTitle(todolistId: string, updateTitle: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: updateTitle})
	}
}
