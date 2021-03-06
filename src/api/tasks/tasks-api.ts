import {instance} from '../../utilities/settings-query-api/setting-api'
import {ResponseTasksType, TaskType, UpdateTaskModelType} from '../../utilities/types/todolists/tasks/tasks-type'

export const tasksAPI = {
	getTasks(todolistId: string) {
		return instance.get <ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
	},
	createTask(newTitle: string, todolistId: string) {
		return instance.post <ResponseTasksType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: newTitle})
	},
	deleteTask(taskId: string, todolistId: string) {
		return instance.delete <ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTaskTitle(taskId: string, status: UpdateTaskModelType, todolistId: string,) {
		return instance.put <ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`, status)
	}
}