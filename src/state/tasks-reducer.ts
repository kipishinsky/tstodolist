import {AppTasksType} from '../AppWithReducers';
import {v1} from 'uuid';
import {addTodoListActionType, removeTodoListActionType} from './todolists-reducer';


export type removeTasksActionType = {
	type: 'REMOVE-TASK',
	taskIdAC: string,
	todolistIdAC: string
}

export type addTasksActionType = {
	type: 'ADD-TASK',
	newTitleTaskAC: string,
	todolistIdAC: string
}

export type changeTasksActionType = {
	type: 'CHANGE-TASK',
	taskIdAC: string,
	taskIsDone: boolean,
	todolistIdAC: string,
}

export type changeTitleTaskActionType = {
	type: 'CHANGE-TITLE-TASK',
	taskIdAC: string,
	newTitleTaskAC: string,
	todolistIdAC: string
}

type ActionType =
	removeTasksActionType |
	addTasksActionType |
	changeTasksActionType |
	changeTitleTaskActionType |
	addTodoListActionType |
	removeTodoListActionType

export const tasksReducer = (state: AppTasksType, action: ActionType): AppTasksType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const copyState = {...state}
			const tasks = state[action.todolistIdAC]
			const filterTasks = tasks.filter (t => t.taskId !== action.taskIdAC)
			copyState[action.todolistIdAC] = filterTasks
			return copyState
		}
		case 'ADD-TASK' : {
			const copyState = {...state};
			const tasks = copyState[action.todolistIdAC];
			const newTask = {taskId: v1(), taskTitle: action.newTitleTaskAC, taskIsDone: false};
			copyState[action.todolistIdAC] = [ ...tasks, newTask];
			return copyState;
		}
		
		case 'CHANGE-TASK' : {
			let copyState = {...state}
			let newTask = copyState[action.todolistIdAC].find(t => t.taskId === action.taskIdAC)
			if (newTask) {
				newTask.taskIsDone = action.taskIsDone
			}
			return copyState
		}
		case 'CHANGE-TITLE-TASK' : {
			let copyState = {...state}
			let newTask = copyState[action.todolistIdAC].find(t => t.taskId === action.taskIdAC)
			if (newTask) {
				newTask.taskTitle = action.newTitleTaskAC
			}
			
			return copyState
		}
		case 'ADD-TODOLIST': {
			let copyState = {...state}
			copyState[action.todolistIdAC] = []
			return copyState
		}
		case 'REMOVE-TODOLIST': {
			let copyState = {...state}
			delete copyState[action.todolistIdAC]
			return copyState
		}
		default:
			throw new Error("I don't understand this type") // выбросить ошибку (throw new Error)
	}
}

export const removeTasksAC = (taskIdAC: string, todolistIdAC: string): removeTasksActionType => {
	return {type: 'REMOVE-TASK', taskIdAC, todolistIdAC};
}

export const addTasksAC = ( newTitleTaskAC: string, todolistIdAC: string): addTasksActionType => {
	return { type: 'ADD-TASK',  newTitleTaskAC, todolistIdAC}
}

export const changeTasksAC = (taskIdAC: string, taskIsDone: boolean, todolistIdAC: string): changeTasksActionType => {
	return { type: 'CHANGE-TASK', taskIdAC, taskIsDone, todolistIdAC}
}

export const changeTitleTaskAC = (taskIdAC: string, newTitleTaskAC: string, todolistIdAC: string) : changeTitleTaskActionType => {
	return { type: 'CHANGE-TITLE-TASK', taskIdAC, newTitleTaskAC, todolistIdAC }
}



