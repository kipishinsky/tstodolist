import {
	addTodoListActionType,
	removeTodoListActionType,
	setTodolistsActionType
} from '../todolists-reducer/todolists-reducer'
import {AppTasksType} from '../../../app/App'
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from '../../../../api/tasks/tasks-api'
import {Dispatch} from 'redux'
import {RootStateType} from '../../../app/store'
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from '../../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/HandleErrorUtils'


const initialState: AppTasksType = {}

export const tasksReducer = (state: AppTasksType = initialState, action: ActionType): AppTasksType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			return {
				...state,
				[action.todolistId]:
					state[action.todolistId].filter(t => t.id !== action.taskId)
			}
		case 'ADD-TASK':
			return {
				...state,
				[action.task.todoListId]:
					[action.task, ...state[action.task.todoListId]]
			}
		case 'CHANGE-TASK-STATUS':
			return {
				...state,
				[action.todolistId]:
					state[action.todolistId].map(t => t.id === action.taskId
						? {...t, ...action.model} : t)
			}
		case 'UPDATE-TASK':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ?
					{...t, title: action.newTitleTask} : t)
			}
		case 'ADD-TODOLIST':
			return {
				...state,
				[action.todolist.id]: []
			}
		case 'REMOVE-TODOLIST': {
			let copyState = {...state}
			delete copyState[action.idAC]
			return copyState
		}
		case 'SET-TODOLISTS': {
			const copyState = {...state}
			action.todolists.forEach(tl => {
				copyState[tl.id] = []
			})
			return copyState
		}
		case 'SET-TASKS':
			return {...state, [action.todolistId]: action.tasks}
		default:
			return state
	}
}

//actions
export const removeTasksAC = (taskId: string, todolistId: string) => ({
	type: 'REMOVE-TASK',
	taskId,
	todolistId
}) as const
export const addTasksAC = (task: TaskType) => ({type: 'ADD-TASK', task}) as const
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskType, todolistId: string) => ({
	type: 'CHANGE-TASK-STATUS',
	taskId,
	model,
	todolistId
}) as const
export const changeTitleTaskAC = (taskId: string, newTitleTask: string, todolistId: string) => ({
	type: 'UPDATE-TASK',
	taskId,
	newTitleTask,
	todolistId
}) as const
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
	type: 'SET-TASKS',
	tasks,
	todolistId
}) as const

//thunks
export const getTasksThunkCreator = (todolistId: string) => {
	return (dispatch: Dispatch<ThunkType>) => {
		dispatch(setStatusAC('loading'))
		tasksAPI.getTasks(todolistId)
			.then((res) => {
				dispatch(setTasksAC(res.data.items, todolistId))
				dispatch(setStatusAC('succeeded'))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ThunkType>) => {
	dispatch(setStatusAC('loading'))
	tasksAPI.deleteTask(taskId, todolistId)
		.then(res => {
			dispatch(removeTasksAC(taskId, todolistId))
			dispatch(setStatusAC('succeeded'))
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch<ThunkType>) => {
	dispatch(setStatusAC('loading'))
	tasksAPI.createTask(todolistId, title)
		.then(res => {
			// @ts-ignore
			if (res.data.resultCode === 0) {
				dispatch(addTasksAC(res.data.data.item))
				dispatch(setStatusAC('succeeded'))
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
	(dispatch: Dispatch<ThunkType>, getState: () => RootStateType) => {
		const task = getState().tasks[todolistId].find(t => t.id === taskId)
		debugger
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
debugger
			dispatch(setStatusAC('loading'))
			tasksAPI.updateTaskTitle(taskId, apiModel, todolistId)
				.then((res) => {
					debugger
					if (res.data.resultCode === 0) {
						dispatch(updateTaskAC(taskId, domainModel, todolistId))
						dispatch(setStatusAC('succeeded'))
					} else {
						handleServerAppError(res.data, dispatch)
					}
				})
				.catch((error) => {
					handleServerNetworkError(error, dispatch)
				})

		}

	}

/*
example

export const addTasksTC = (title: string, todolistId: string) => {
	debugger
	return (dispatch: Dispatch) => {
		debugger
		tasksAPI.createTask(title, todolistId )
			.then(res => {
				debugger
				// @ts-ignore
				const task = res.data.data.item
				// @ts-ignore
				const action = addTasksAC(task)
				dispatch(action)
			})
			.catch((err) => {
				debugger
			})
	}
}*/

type ThunkType = ActionType | SetErrorActionType | SetStatusActionType

//types
export type UpdateDomainTaskType = {
	title?: string,
	description?: string,
	status?: TaskStatuses,
	priority?: TaskPriorities,
	startDate?: string,
	deadline?: string
}

type ActionType =
	| ReturnType<typeof removeTasksAC>
	| ReturnType<typeof addTasksAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof changeTitleTaskAC>
	| ReturnType<typeof setTasksAC>
	| addTodoListActionType
	| setTodolistsActionType
	| removeTodoListActionType
