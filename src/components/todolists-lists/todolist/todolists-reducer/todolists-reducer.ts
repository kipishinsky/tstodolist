import {todolistsAPI} from '../../../../api/todolist/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setStatusAC,} from '../../../app/app-reducer'
import {handleServerNetworkError} from '../../../../utils/HandleErrorUtils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterValuesType, TodolistsReducerType, TodolistType} from '../../../../common/types'

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

export const {
	removeTodolistAC, addTodolistAC, changeTodoTitleAC,
	changeTodoListFilterAC, setTodolistsAC, changeTodolistEntityStatusAC
} = slice.actions

//thunks
export const fetchTodolistsThunkCreator = () => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	todolistsAPI.getTodolists()
		.then((res) => {
			dispatch(setTodolistsAC({todolists: res.data}))
			dispatch(setStatusAC({status: 'succeeded'}))
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const removeTodolistsTC = (id: string) => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}))
	todolistsAPI.deleteTodolists(id)
		.then((res) => {
				dispatch(removeTodolistAC({id}))
				dispatch(setStatusAC({status: 'succeeded'}))
			}
		)
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	todolistsAPI.createTodolists(title)
		.then((res) => {
			dispatch(addTodolistAC({todolist: res.data.data.item}))
			dispatch(setStatusAC({status: 'succeeded'}))
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})

}
export const changeTodoTitleTC = (id: string, changeTitle: string) => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	todolistsAPI.updateTodolistsTitle(id, changeTitle)
		.then((res) => {
				dispatch(changeTodoTitleAC({id, changeTitle}))
				dispatch(setStatusAC({status: 'succeeded'}))
			}
		)
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}


