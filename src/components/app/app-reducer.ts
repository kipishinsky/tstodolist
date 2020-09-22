import {Dispatch} from 'redux'
import {loginApi} from '../../api/login/login-api'
import {setIsLoggedInAC} from '../login/auth-reducer'

const initialState: InitialStateType = {
	status: 'loading',
	error: null,
	initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		case 'APP/SET-ERROR':
			return {...state, error: action.error}
		case 'APP/SET-INITIALIZED':
			return {...state, initialized: action.init}
		default:
			return state
	}
}

//action
export const setStatusAC = (status: RequestStatusType) => ({
	type: 'APP/SET-STATUS', status
}) as const
export const setErrorAC = (error: string | null) => ({
	type: 'APP/SET-ERROR', error
}) as const
export const setAppInitializedAC = (init: boolean) => ({
	type: 'APP/SET-INITIALIZED', init
}) as const

//thunk
export const initializedAppTC = () => (dispatch: Dispatch) => {
	loginApi.getStatusMe().then( res => {
		if(res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(true))
			dispatch(setStatusAC('succeeded'))
		}
		dispatch(setAppInitializedAC(true))
		dispatch(setStatusAC('succeeded'))
	})
}

export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status: RequestStatusType,
	// ошибку пишем сюда
	error: string | null,
	// проверяет логинизацию
	initialized: boolean
}

type ActionsType =
	| SetErrorActionType
	| SetStatusActionType
	| SetAppInitializedActionType
