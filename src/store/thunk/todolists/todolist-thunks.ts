import {setStatusAC} from '../../reducers/app/app-reducer'
import {todolistsAPI} from '../../../api/todolist/todolists-api'
import {handleServerNetworkError} from '../handle-error/HandleErrorUtils'
import {
	addTodolistAC, changeTodolistEntityStatusAC,
	changeTodoTitleAC, removeTodolistAC, setTodolistsAC
} from '../../reducers/todolists/todolists-reducer'

import {Dispatch} from 'redux'

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
		.then(() => {
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
		.then(() => {
				dispatch(changeTodoTitleAC({id, changeTitle}))
				dispatch(setStatusAC({status: 'succeeded'}))
			}
		)
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}


