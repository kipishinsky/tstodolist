import {v1} from 'uuid';
import {addTodoListActionType, removeTodoListActionType} from '../todolists-reducer/todolists-reducer';
import {AppTasksType} from "../../../components/app/AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../api/tasks/tasks-api";


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
	status: TaskStatuses,
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
			copyState[action.todolistIdAC] = tasks.filter(t => t.id !== action.taskIdAC)
			return copyState
		}
		case 'ADD-TASK' : {
			const copyState = {...state};
			const tasks = copyState[action.todolistIdAC];
			const newTask: TaskType = {
				id: v1(),
				title: action.newTitleTaskAC,
				status: TaskStatuses.New,
				todoListId: action.todolistIdAC,
				priority: TaskPriorities.Low,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''

			};
			copyState[action.todolistIdAC] = [...tasks, newTask];
			return copyState;
		}
		
		case 'CHANGE-TASK-STATUS' : {
			let copyState = {...state}
			let task = state[action.todolistIdAC]
			copyState[action.todolistIdAC] = task.map ( t => t.id === action.taskIdAC ? { ...t, status: action.status} : t)
			return copyState
		}
		case 'CHANGE-TITLE-TASK': {
			debugger
			let copyState = {...state}
			let task = state[action.todolistIdAC]
			copyState[action.todolistIdAC] = task.map ( t => t.id === action.taskIdAC ?
				{...t, taskTitle: action.newTitleTaskAC} : t)
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

export const changeStatusTaskAC = (taskIdAC: string, status: TaskStatuses, todolistIdAC: string): changeTasksStatusActionType => {
	return {type: 'CHANGE-TASK-STATUS', taskIdAC, status, todolistIdAC}
}

export const changeTitleTaskAC = (taskIdAC: string, newTitleTaskAC: string, todolistIdAC: string): changeTitleTaskActionType => {
	return {type: 'CHANGE-TITLE-TASK', taskIdAC, newTitleTaskAC, todolistIdAC}
}



