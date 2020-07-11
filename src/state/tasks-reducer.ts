import {AppTasksHookType} from '../App';
import {v1} from 'uuid';
import {addTodoListActionType, removeTodoListActionType} from './todolists-reducer';


export type removeTasksActionType = {
	type: 'REMOVE-TASK',
	taskId: string,
	todoListId: string
}

export type addTasksActionType = {
	type: 'ADD-TASK',
	taskId: string,
	newTitleTask: string,
	todoListId: string
}

export type changeTasksActionType = {
	type: 'CHANGE-TASK',
	taskId: string,
	taskIsDone: boolean,
	todoListId: string,
	newTitleTask: string
}

export type changeTitleTaskActionType = {
	type: 'CHANGE-TITLE-TASK',
	taskId: string,
	newTitleTask: string,
	todoListId: string
}

type ActionType = removeTasksActionType | addTasksActionType | changeTasksActionType | changeTitleTaskActionType | addTodoListActionType | removeTodoListActionType

export const tasksReducer = (state: AppTasksHookType, action: ActionType): AppTasksHookType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			let copyState = {...state}
			copyState[action.todoListId] = copyState[action.todoListId].filter( t => t.tasksId != action.taskId)
			return copyState
		}
		case 'ADD-TASK' : {
			let copyState = {...state}
			let newTask = {tasksId: v1(), tasksTitle: action.newTitleTask, tasksIsDone: false}
			copyState[action.todoListId] = [...copyState[action.todoListId], newTask]
			return copyState
		}
		case 'CHANGE-TASK' : {
			let copyState = {...state}
			let newTask = copyState[action.todoListId].find(t => t.tasksId === action.taskId)
			if (newTask) {
				newTask.tasksIsDone = action.taskIsDone
				return {...state}
			}
		}
		case 'CHANGE-TITLE-TASK' : {
			let copyState = {...state}
			let newTask = copyState[action.todoListId].find(t => t.tasksId === action.taskId)
			if (newTask) {
				newTask.tasksTitle = action.newTitleTask
				return {...state}
			}
		}
		case 'ADD-TODOLIST': {
			let copyState = {...state}
			copyState[action.todoListId] = []
			return copyState
		}
		case 'REMOVE-TODOLIST': {
			let copyState = {...state}
			delete copyState[action.todoListsId]
			return copyState
		}
		default:
			throw new Error("I don't understand this type") // выбросить ошибку (throw new Error)
	}
}

export const removeTasksAT = (taskId: string, todoListId: string): removeTasksActionType => {
	return {type: 'REMOVE-TASK', taskId, todoListId};
}

export const addTasksAT = (taskId: string, newTitleTask: string, todoListId: string): addTasksActionType => {
	return { type: 'ADD-TASK', taskId, newTitleTask, todoListId}
}

export const changeTasksAT = (taskId: string, taskIsDone: boolean, todoListId: string, newTitleTask: string): changeTasksActionType => {
	return { type: 'CHANGE-TASK', taskId, taskIsDone, todoListId, newTitleTask}
}

export const changeTitleTaskAT = (taskId: string, newTitleTask: string, todoListId: string) : changeTitleTaskActionType => {
	return { type: 'CHANGE-TITLE-TASK', taskId, newTitleTask, todoListId }
}



