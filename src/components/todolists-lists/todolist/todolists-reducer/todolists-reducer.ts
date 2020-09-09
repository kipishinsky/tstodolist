import {todolistsAPI, TodolistType} from "../../../../api/todolist/todolists-api";
import {Dispatch} from "redux";
import {setStatusAC, SetStatusActionType} from '../../../app/app-reducer'

const initialState: Array<TodolistsReducerType> = []

export const todolistsReducer = (state: Array<TodolistsReducerType> = initialState, action: ActionType): Array<TodolistsReducerType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': return state.filter(st => st.id !== action.idAC)
		case 'ADD-TODOLIST': return [...state, {...action.todolist, filter: 'All'}]
		case 'CHANGE-TODOLIST-TITLE': return state.map( tl => tl.id === action.idAC ? {...tl, title: action.titleAC} : tl)
		case 'CHANGE-TODOLIST-FILTER': return state.map( tl => tl.id === action.idAC ? {...tl, filter: action.filterAC} : tl)
		case 'SET-TODOLISTS': return action.todolists.map(tl => ({...tl, filter: 'All'}))
		default: return state
	}
}

//actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', idAC: id}) as const
export const addTodolistAC = (todolist: TodolistType,) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodoTitleAC = (id: string, changeTitle: string) => ({
	type: 'CHANGE-TODOLIST-TITLE',
	idAC: id,
	titleAC: changeTitle,
	filterAC: 'All'
}) as const
export const changeTodoListFilterAC = (id: string, filterValue: FilterValuesType) => ({
	type: 'CHANGE-TODOLIST-FILTER',
	filterAC: filterValue,
	idAC: id
}) as const
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists}) as const

//thunks
export const fetchTodolistsThunkCreator = () => (dispatch: Dispatch<ActionType | SetStatusActionType>) => {
	dispatch(setStatusAC('loading'))
	todolistsAPI.getTodolists()
		.then((res) => {
			dispatch(setTodolistsAC(res.data))
			dispatch(setStatusAC('succeeded'))
		})
}
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<ActionType | SetStatusActionType>) => {
	dispatch(setStatusAC('loading'))
	todolistsAPI.deleteTodolists(todolistId)
		.then((res) => {
				dispatch(removeTodolistAC(todolistId))
			dispatch(setStatusAC('succeeded'))
			}
		)
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
	todolistsAPI.createTodolists(title)
		.then((res) => {
				dispatch(addTodolistAC(res.data.data.item))
			}
		)
}
export const changeTodoTitleTC = (id: string, changeTitle: string) => (dispatch: Dispatch<ActionType>) => {
	todolistsAPI.updateTodolistsTitle(id, changeTitle)
		.then((res) => {
				dispatch(changeTodoTitleAC(id, changeTitle))
			}
		)
}

//types
export type addTodoListActionType = ReturnType<typeof addTodolistAC>
export type removeTodoListActionType = ReturnType<typeof removeTodolistAC>
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type FilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок
export type TodolistsReducerType = TodolistType & {
	filter: FilterValuesType
}

type ActionType =
	| removeTodoListActionType
	| setTodolistsActionType
	| addTodoListActionType
	| ReturnType<typeof changeTodoTitleAC>
	| ReturnType<typeof changeTodoListFilterAC>
