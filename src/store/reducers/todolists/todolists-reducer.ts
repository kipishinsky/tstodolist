import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterValuesType, TodolistsReducerType, TodolistType} from '../../../utilities/types/todolists/todolists-types'
import {RequestStatusType} from '../../../utilities/types/error-status/err-st-types'

const initialState: Array<TodolistsReducerType> = []

const slice = createSlice({
	name: 'todolist',
	initialState: initialState,
	reducers: {
		removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			if (index > -1) {
				state.splice(index, 1)
			}
		},
		addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
			state.unshift({...action.payload.todolist, filter: 'All', entityStatus: 'idle'})
		},
		changeTodoTitleAC(state, action: PayloadAction<{ id: string, changeTitle: string }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			state[index].title = action.payload.changeTitle
		},
		changeTodoListFilterAC(state, action: PayloadAction<{ id: string, filterValue: FilterValuesType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			state[index].filter = action.payload.filterValue
		},
		setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
			return action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}))
		},
		changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			state[index].entityStatus = action.payload.status
		},
	}
})

export const todolistsReducer = slice.reducer

//action
export const {
	removeTodolistAC, addTodolistAC, changeTodoTitleAC,
	changeTodoListFilterAC, setTodolistsAC, changeTodolistEntityStatusAC
} = slice.actions