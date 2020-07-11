import {AppFilterValuesType, AppTodoListsHookType} from '../App';
import {v1} from 'uuid';


export type removeTodoListActionType = {
	type: 'REMOVE-TODOLIST',
	todoListsId: string
}

export type addTodoListActionType = {
	type: 'ADD-TODOLIST' ,
	todoListId: string,
	title: string
}

export type changeTodoListActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	id: string,
	title: string,
	filter: AppFilterValuesType
}

export type changeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	id: string,
	filter: AppFilterValuesType
}

type ActionType = removeTodoListActionType | addTodoListActionType | changeTodoListActionType | changeTodoListFilterActionType;

export const todoListsReducer = (state: Array<AppTodoListsHookType>, action: ActionType): Array<AppTodoListsHookType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST' : {
			return state.filter(st => st.todoListsId != action.todoListsId)
		}
		case 'ADD-TODOLIST' : {
			return [...state, {
				todoListsId: action.todoListId,
				todoListsTitle: action.title,
				todoListsFilter: "All"
			}]
		}
		case 'CHANGE-TODOLIST-TITLE' : {
			let todoList = state.find ( st =>  st.todoListsId === action.id)
			if (todoList) {
				todoList.todoListsTitle = action.title
				return [...state]
			}
		}
		case 'CHANGE-TODOLIST-FILTER' : {
			let newState = state.find ( st => st.todoListsId === action.id)
			if (newState) {
				newState.todoListsFilter = action.filter
				return [...state]
			}
		}
		default:
			throw new Error("I don't understand this type") // выбросить ошибку (throw new Error)
	}
}

export const removeTodolistAT = (todolistId: string): removeTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', todoListsId: todolistId}
}

export const addTodoListAT = (newTodoListTitle: string, ) : addTodoListActionType => {
	return { type: 'ADD-TODOLIST', title: newTodoListTitle, todoListId: v1() }
}

export const changeTodoListAT = (todoListId2: string, newTodoListTitle: string): changeTodoListActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: todoListId2, title: newTodoListTitle, filter: 'All'}
}

export const changeTodoListFilterAT = (todoListId2: string, newFilter: AppFilterValuesType): changeTodoListFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: todoListId2, filter: newFilter}
}

