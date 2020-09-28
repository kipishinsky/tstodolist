import {setStatusAC} from '../../reducers/app/app-reducer'
import {tasksAPI} from '../../../api/tasks/tasks-api'
import {handleServerAppError, handleServerNetworkError} from '../handle-error/HandleErrorUtils'
import {addTasksAC, removeTasksAC, setTasksAC, updateTaskAC} from '../../reducers/tasks/tasks-reducer'

import {RootStateType} from '../../store'
import {Dispatch} from 'redux'
import {UpdateDomainTaskType, UpdateTaskModelType} from '../../../utilities/types/todolists/tasks/tasks-type'

export const getTasksThunkCreator = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setStatusAC({status: 'loading'}))
		tasksAPI.getTasks(todolistId)
			.then((res) => {
				dispatch(setTasksAC({tasks: res.data.items, todolistId}))
				dispatch(setStatusAC({status: 'succeeded'}))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	tasksAPI.deleteTask(taskId, todolistId)
		.then(() => {
			dispatch(removeTasksAC({taskId, todolistId}))
			dispatch(setStatusAC({status: 'succeeded'}))
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	tasksAPI.createTask(todolistId, title)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(addTasksAC({task: res.data.data.item}))
				dispatch(setStatusAC({status: 'succeeded'}))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
				handleServerNetworkError(error, dispatch)
			}
		)
}
export const changeTaskStatusTC = (taskId: string, domainModel: UpdateDomainTaskType, todolistId: string) =>
	(dispatch: Dispatch, getState: () => RootStateType) => {
		const task = getState().tasks[todolistId].find(t => t.id === taskId)

		if (task) {
			const apiModel: UpdateTaskModelType = {
				title: task.title,
				description: task.description,
				status: task.status,
				completed: task.completed,
				priority: task.priority,
				startDate: task.startDate,
				deadline: task.deadline,
				...domainModel
			}

			dispatch(setStatusAC({status: 'loading'}))
			tasksAPI.updateTaskTitle(taskId, apiModel, todolistId)
				.then((res) => {
					if (res.data.resultCode === 0) {
						dispatch(updateTaskAC({taskId, model: domainModel, todolistId}))
						dispatch(setStatusAC({status: 'succeeded'}))
					} else {
						handleServerAppError(res.data, dispatch)
					}
				})
				.catch((error) => {
					handleServerNetworkError(error, dispatch)
				})

		}

	}


