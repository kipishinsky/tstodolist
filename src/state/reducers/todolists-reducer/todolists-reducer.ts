import {v1} from 'uuid';
import {TodolistType} from "../../../api/todolist/todolists-api";


export type removeTodoListActionType = {
	type: 'REMOVE-TODOLIST',
	idAC: string
}

export type addTodoListActionType = {
	type: 'ADD-TODOLIST',
	idAC: string,
	titleAC: string
}

export type changeTodoListActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	idAC: string,
	titleAC: string,
	filterAC: FilterValuesType
}

export type changeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	idAC: string,
	filterAC: FilterValuesType
}

type ActionType =
	removeTodoListActionType |
	addTodoListActionType |
	changeTodoListActionType |
	changeTodoListFilterActionType
;


export let todolistId1 = v1();
export let todolistId2 = v1();


const initialState: Array<TodolistsReducerType> = [

]

export type FilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок

export type TodolistsReducerType = TodolistType & {
	filter: FilterValuesType
}

export const todoListsReducer = (state: Array<TodolistsReducerType> = initialState, action: ActionType): Array<TodolistsReducerType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST' : {
			return state.filter(st => st.id !== action.idAC)
		}
		case 'ADD-TODOLIST' : {
			return [{
				id: action.idAC,
				title: action.titleAC,
				filter: 'All',
				addedDate: '',
				order: 0
			},...state]
		}
		case 'CHANGE-TODOLIST-TITLE' : {
			let todoList = state.find(st => st.id === action.idAC)
			if (todoList) {
				todoList.title = action.titleAC
				return [...state]
			}
		}
		case 'CHANGE-TODOLIST-FILTER' : {
			let newState = state.find(st => st.id === action.idAC)
			if (newState) {
				newState.filter = action.filterAC
				return [...state]
			}
		}
		default:
			return state
	}
}

export const removeTodolistAC = (id: string): removeTodoListActionType => {
	return {type: 'REMOVE-TODOLIST', idAC: id}
}

export const addTodoListAC = (newTitleForTodolist: string,): addTodoListActionType => {
	return {type: 'ADD-TODOLIST', titleAC: newTitleForTodolist, idAC: v1()}
}

export const changeTodoTitleAC = (id: string, changeTitle: string): changeTodoListActionType => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		idAC: id,
		titleAC: changeTitle,
		filterAC: 'All'
	}
}

export const changeTodoListFilterAC = (id: string, filterValue: FilterValuesType): changeTodoListFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', filterAC: filterValue, idAC: id}
}

