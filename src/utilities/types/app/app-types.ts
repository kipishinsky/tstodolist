import {TaskType} from '../todolists/tasks/tasks-type'
import {RequestStatusType} from '../error-status/err-st-types'

export type AppInitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status: RequestStatusType,
	// ошибку пишем сюда
	error: string | null,
	// проверяет логинизацию
	initialized: boolean
}

export type AppTasksType = {
	[key: string]: Array<TaskType>
}

export type AppPropsType = {
	demo?: boolean
}