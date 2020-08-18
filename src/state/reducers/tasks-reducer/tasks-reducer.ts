
import {
	addTodoListActionType,
	removeTodoListActionType,
	setTodolistsActionType
} from '../todolists-reducer/todolists-reducer';
import {AppTasksType} from "../../../components/app/AppWithRedux";
import {tasksAPI, TaskStatuses, TaskType} from "../../../api/tasks/tasks-api";
import {Dispatch} from "redux";



export type removeTasksActionType = {
	type: 'REMOVE-TASK',
	taskId: string,
	todolistId: string
}

export type addTasksActionType = {
	type: 'ADD-TASK',
	task: TaskType
}

export type changeTasksStatusActionType = {
	type: 'CHANGE-TASK-STATUS',
	taskId: string,
	status: TaskStatuses,
	todolistId: string,
}

export type changeTitleTaskActionType = {
	type: 'CHANGE-TITLE-TASK',
	taskId: string,
	newTitleTask: string,
	todolistId: string
}

export type setTasksActionType = {
	type: 'SET-TASKS'
	tasks: Array<TaskType>
	todolistId: string
}


type ActionType =
	removeTasksActionType |
	addTasksActionType |
	changeTasksStatusActionType |
	changeTitleTaskActionType |
	addTodoListActionType |
	setTodolistsActionType |
	removeTodoListActionType |
	setTasksActionType


const initialState: AppTasksType = {}


export const tasksReducer = (state: AppTasksType = initialState, action: ActionType): AppTasksType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const copyState = {...state}
			const tasks = state[action.todolistId]
			copyState[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
			return copyState
		}

		case 'ADD-TASK' : {
			const copyState = {...state};
			const newTask = action.task
			const tasks = copyState[newTask.todoListId]
			const newTasks = [newTask, ...tasks]
			copyState[newTask.todoListId] = newTasks
			return copyState
		}

		case 'CHANGE-TASK-STATUS' : {
			let copyState = {...state}
			let task = state[action.todolistId]
			copyState[action.todolistId] = task.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
			return copyState
		}
		case 'CHANGE-TITLE-TASK': {
			let copyState = {...state}
			let task = state[action.todolistId]
			copyState[action.todolistId] = task.map(t => t.id === action.taskId ?
				{...t, title: action.newTitleTask} : t)
			return copyState
		}
		case 'ADD-TODOLIST': {
			debugger
			return {...state,
				[action.todolist.id]: []
			}
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

		case 'SET-TASKS': {
			const copyState = {...state}
			copyState[action.todolistId] = action.tasks
			return copyState
		}

		default:
			return state;
	}
}

export const removeTasksAC = (taskId: string, todolistId: string): removeTasksActionType => {
	return {type: 'REMOVE-TASK', taskId, todolistId};
}

export const addTasksAC = (task: TaskType): addTasksActionType => {
	return {type: 'ADD-TASK', task}
}

export const changeStatusTaskAC = (taskId: string, status: TaskStatuses, todolistId: string): changeTasksStatusActionType => {
	return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}

export const changeTitleTaskAC = (taskId: string, newTitleTask: string, todolistId: string): changeTitleTaskActionType => {
	return {type: 'CHANGE-TITLE-TASK', taskId, newTitleTask, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): setTasksActionType => {
	return {type: 'SET-TASKS', tasks, todolistId}
}

export const getTasksThunkCreator = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		tasksAPI.getTasks(todolistId)
			.then((res) => {
				dispatch(setTasksAC(res.data.items, todolistId))
			})
	}
}

export const removeTaskTC = ( taskId: string , todolistId: string ) => {
	return (dispatch: Dispatch) => {
		tasksAPI.deleteTask(taskId, todolistId)
			.then(res => {
				dispatch(removeTasksAC(taskId, todolistId))
			})
	}
}

export const addTasksTC = (todolistId: string , title: string) => {
	debugger
	return (dispatch: Dispatch) => {
		debugger
		tasksAPI.createTask(todolistId, title)
			.then(res => {
				debugger
				const task = res.data.data.item
				const action = addTasksAC(task)
				dispatch(action)
			}).catch((err) => {
			debugger
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
