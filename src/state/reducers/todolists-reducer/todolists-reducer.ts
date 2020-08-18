import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from "../../../api/todolist/todolists-api";
import {Dispatch} from "redux";

export type removeTodoListActionType = {
	type: 'REMOVE-TODOLIST',
	idAC: string
}

export type addTodoListActionType = {
	type: 'ADD-TODOLIST',
	todolist: TodolistType
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

export type setTodolistsActionType = {
	type: 'SET-TODOLISTS'
	todolists: Array<TodolistType>
}

type ActionType =
	removeTodoListActionType |
	setTodolistsActionType |
	addTodoListActionType |
	changeTodoListActionType |
	changeTodoListFilterActionType

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistsReducerType> = []

export type FilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок

export type TodolistsReducerType = TodolistType & {
	filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistsReducerType> = initialState, action: ActionType): Array<TodolistsReducerType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST' : {
			return state.filter(st => st.id !== action.idAC)
		}
		case 'ADD-TODOLIST' : {
			const newTodolist: TodolistsReducerType = {...action.todolist, filter: 'All'}
			return [...state, newTodolist]
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
		case 'SET-TODOLISTS': {
			// @ts-ignore
			return action.todolists.map(tl => ({
				...tl,
				filter: 'all' // к тому
			}))
		}
		default:
			return state
	}
}

export const removeTodolistAC = (id: string): removeTodoListActionType => {
	return {type: 'REMOVE-TODOLIST', idAC: id}
}

export const addTodolistAC = (todolist: TodolistType,): addTodoListActionType => {
	return {type: 'ADD-TODOLIST', todolist}
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

export const setTodolistsAC = (todolists: Array<TodolistType>): setTodolistsActionType => {
	return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsThunkCreator = () => {
	return (dispatch: Dispatch) => {
		todolistsAPI.getTodolists()
			.then((res) => {
				dispatch(setTodolistsAC(res.data))
		})
	}
}

export const removeTodolistsTC = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.deleteTodolists(todolistId)
			.then((res) => {
				dispatch(removeTodolistAC(todolistId))
			}
		)
	}
}

export const addTodolistsTC = (title: string ) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.createTodolists(title)
			.then( (res) => {
					dispatch(addTodolistAC(res.data.data.item))
				}
			)
	}
}

export const changeTodoTitleTC = (id: string, changeTitle: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.updateTodolistsTitle(id, changeTitle)
			.then( (res) => {
					dispatch(changeTodoTitleAC(id, changeTitle))
				}
			)
	}
}

