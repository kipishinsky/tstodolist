import {v1} from 'uuid';
import {
	addTodoListActionType,
	removeTodoListActionType, setTodolistsAC,
	setTodolistsActionType
} from '../todolists-reducer/todolists-reducer';
import {AppTasksType} from "../../../components/app/AppWithRedux";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../../../api/tasks/tasks-api";
import {Dispatch} from "redux";
import {todolistsAPI} from "../../../api/todolist/todolists-api";


export type removeTasksActionType = {
	type: 'REMOVE-TASK',
	taskId: string,
	todolistId: string
}

export type addTasksActionType = {
	type: 'ADD-TASK',
	newTitleTask: string,
	todolistId: string
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



const initialState: AppTasksType = {

}


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
			const tasks = copyState[action.todolistId];
			const newTask: TaskType = {
				id: v1(),
				title: action.newTitleTask,
				status: TaskStatuses.New,
				todoListId: action.todolistId,
				priority: TaskPriorities.Low,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''

			};
			copyState[action.todolistId] = [...tasks, newTask];
			return copyState;
		}
		
		case 'CHANGE-TASK-STATUS' : {
			let copyState = {...state}
			let task = state[action.todolistId]
			copyState[action.todolistId] = task.map ( t => t.id === action.taskId ? { ...t, status: action.status} : t)
			return copyState
		}
		case 'CHANGE-TITLE-TASK': {
			let copyState = {...state}
			let task = state[action.todolistId]
			copyState[action.todolistId] = task.map ( t => t.id === action.taskId ?
				{...t, title: action.newTitleTask} : t)
			return copyState
		}
		case 'ADD-TODOLIST': {
			let copyState = {...state}
			copyState[action.idAC] = []
			return copyState
		}
		case 'REMOVE-TODOLIST': {
			let copyState = {...state}
			delete copyState[action.idAC]
			return copyState
		}

		case 'SET-TODOLISTS': {
			const copyState = {...state}
			action.todolists.forEach ( tl => {
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

export const addTasksAC = (newTitleTask: string, todolistId: string): addTasksActionType => {
	return {type: 'ADD-TASK', newTitleTask, todolistId}
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

export const fetchTasksThunkCreator = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		tasksAPI.getTasks(todolistId)
			.then((res) => {
				dispatch(setTasksAC(res.data.items, todolistId ))
			})
	}
}



