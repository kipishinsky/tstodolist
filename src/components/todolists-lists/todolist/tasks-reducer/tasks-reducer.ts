import {AppTasksType} from '../../../app/App'
import {Dispatch} from 'redux'
import {RootStateType} from '../../../app/store'
import {setStatusAC} from '../../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/HandleErrorUtils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../todolists-reducer/todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../../../common/types'
import {tasksAPI} from '../../../../api/tasks/tasks-api'

const initialState: AppTasksType = {}

const slice = createSlice({
	name: 'todolist',
	initialState: initialState,
	reducers: {
		removeTasksAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
			if (index > -1) {
				tasks.splice(index, 1)
			}
		},
		addTasksAC(state, action: PayloadAction<{ task: TaskType }>) {
			state[action.payload.task.todoListId].unshift(action.payload.task)
		},
		updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskType, todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
			if (index > -1) {
				tasks[index] = {...tasks[index], ...action.payload.model}
			}
		},
		changeTitleTaskAC(state, action: PayloadAction<{ taskId: string, newTitleTask: string, todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
			if (index > -1) {
				tasks[index] = {...tasks[index], title: action.payload.newTitleTask}
			}
		},
		setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
			state[action.payload.todolistId] = action.payload.tasks
		}
	},
	extraReducers(builder) {
		builder.addCase(addTodolistAC, (state, action) => {
			state[action.payload.todolist.id] = []
		})
		builder.addCase(removeTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		builder.addCase(setTodolistsAC, (state, action) => {
			action.payload.todolists.forEach((tl: any) => {
				state[tl.id] = []
			})
		})
	}
})

export const tasksReducer = slice.reducer
export const {
	removeTasksAC, addTasksAC, updateTaskAC,
	changeTitleTaskAC, setTasksAC
} = slice.actions

//thunks
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
		.then(res => {
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

//types
export type UpdateDomainTaskType = {
	title?: string,
	description?: string,
	status?: TaskStatuses,
	priority?: TaskPriorities,
	startDate?: string,
	deadline?: string
}

