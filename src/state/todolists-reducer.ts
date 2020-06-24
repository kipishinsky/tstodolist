import {AppFilterValuesType, AppTodoListsHookType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST',
	id: string
}

export type AddTodoListActionType = {
	type: 'ADD-TODOLIST' ,
	id: string,
	title: string
}

export type ChangeTodoListActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	id: string,
	title: string,
	filter: AppFilterValuesType
}

export type ChangeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	id: string,
	filter: AppFilterValuesType
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListActionType | ChangeTodoListFilterActionType;

export const todoListsReducer = (state: Array<AppTodoListsHookType>, action: ActionType): Array<AppTodoListsHookType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST' : {
			return state.filter(st => st.todoListsHookID != action.id)
		}
		case 'ADD-TODOLIST' : {
			return [...state, {
				todoListsHookID: v1(),
				todoListsHookTITLE: action.title,
				todoListsHookFILTER: "All"
			}]
		}
		case 'CHANGE-TODOLIST-TITLE' : {
			let todoList = state.find ( st =>  st.todoListsHookID === action.id)
			if (todoList) {
				todoList.todoListsHookTITLE = action.title
				return [...state]
			}
		}
		case 'CHANGE-TODOLIST-FILTER' : {
			let newState = state.find ( st => st.todoListsHookID === action.id)
			if (newState) {
				newState.todoListsHookFILTER = action.filter
				return [...state]
			}
		}
		default:
			throw new Error("I don't understand this type") // выбросить ошибку (throw new Error)
	}
}

export const RemoveTodolistAT = (todolistId: string): RemoveTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodoListAT = (newTodoListTitle: string, todoListId2: string) : AddTodoListActionType => {
	return { type: 'ADD-TODOLIST', title: newTodoListTitle, id: todoListId2 }
}

export const ChangeTodoListAT = (todoListId2: string, newTodoListTitle: string): ChangeTodoListActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: todoListId2, title: newTodoListTitle, filter: 'All'}
}

export const ChangeTodoListFilterAT = (todoListId2: string, newFilter: AppFilterValuesType): ChangeTodoListFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: todoListId2, filter: newFilter}
}

