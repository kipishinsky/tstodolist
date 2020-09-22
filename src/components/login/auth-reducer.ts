import {Dispatch} from 'redux'
import {SetErrorActionType, setStatusAC, SetStatusActionType} from '../app/app-reducer'
import {loginApi, LoginParametersType} from '../../api/login/login-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/HandleErrorUtils'

const initialState: InitialStateType = {
	isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return {...state, isLoggedIn: action.value}
		default:
			return state
	}
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
	({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParametersType) => (dispatch: Dispatch<ActionsType>) => {
	//debugger
	dispatch(setStatusAC('loading'))
	loginApi.createLogin(data).then(res => {
			if (res.data.resultCode === 0) {
				//debugger
				dispatch(setIsLoggedInAC(true))
				dispatch(setStatusAC('succeeded'))
			} else {
				// @ts-ignore
				handleServerAppError(res.data, dispatch)

			}
		}
	).catch((error) => {
			handleServerNetworkError(error, dispatch)

		}
	)
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
	//debugger
	dispatch(setStatusAC('loading'))
	loginApi.deleteLogin().then(res => {
			if (res.data.resultCode === 0) {
				//debugger
				dispatch(setIsLoggedInAC(false))
				dispatch(setStatusAC('succeeded'))
			} else {
				// @ts-ignore
				handleServerAppError(res.data, dispatch)

			}
		}
	).catch((error) => {
			handleServerNetworkError(error, dispatch)

		}
	)
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusActionType | SetErrorActionType
type InitialStateType = {
	isLoggedIn: boolean
}
