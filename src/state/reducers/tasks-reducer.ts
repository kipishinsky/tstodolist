import {AppTasksType} from '../../AppWithReducers';
import {v1} from 'uuid';
import {addTodoListActionType, removeTodoListActionType, todoListId1, todoListId2} from './todolists-reducer';


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

export type changeTasksStatusActionType = {
	type: 'CHANGE-TASK-STATUS',
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
	changeTasksStatusActionType |
	changeTitleTaskActionType |
	addTodoListActionType |
	removeTodoListActionType
	;


const initialState: AppTasksType = {

}


export const tasksReducer = (state: AppTasksType = initialState, action: ActionType): AppTasksType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const copyState = {...state}
			const tasks = state[action.todolistIdAC]
			copyState[action.todolistIdAC] = tasks.filter(t => t.taskId !== action.taskIdAC)
			return copyState
		}
		case 'ADD-TASK' : {
			const copyState = {...state};
			const tasks = copyState[action.todolistIdAC];
			const newTask = {taskId: v1(), taskTitle: action.newTitleTaskAC, taskIsDone: false};
			copyState[action.todolistIdAC] = [...tasks, newTask];
			return copyState;
		}
		
		case 'CHANGE-TASK-STATUS' : {
			let copyState = {...state}
			let task = state[action.todolistIdAC]
			copyState[action.todolistIdAC] = task.map ( t => t.taskId === action.taskIdAC ? { ...t, taskIsDone: action.taskIsDone} : t)
			return copyState
		}
		case 'CHANGE-TITLE-TASK': {
			debugger
			let copyState = {...state}
			let task = state[action.todolistIdAC]
			copyState[action.todolistIdAC] = task.map ( t => t.taskId === action.taskIdAC ?
				{...t, taskTitle: action.newTitleTaskAC} : t)
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
			return state;
	}
}

export const removeTasksAC = (taskIdAC: string, todolistIdAC: string): removeTasksActionType => {
	return {type: 'REMOVE-TASK', taskIdAC, todolistIdAC};
}

export const addTasksAC = (newTitleTaskAC: string, todolistIdAC: string): addTasksActionType => {
	return {type: 'ADD-TASK', newTitleTaskAC, todolistIdAC}
}

export const changeStatusTaskAC = (taskIdAC: string, taskIsDone: boolean, todolistIdAC: string): changeTasksStatusActionType => {
	return {type: 'CHANGE-TASK-STATUS', taskIdAC, taskIsDone, todolistIdAC}
}

export const changeTitleTaskAC = (taskIdAC: string, newTitleTaskAC: string, todolistIdAC: string): changeTitleTaskActionType => {
	return {type: 'CHANGE-TITLE-TASK', taskIdAC, newTitleTaskAC, todolistIdAC}
}



