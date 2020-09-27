import {Dispatch} from 'redux'
import {setStatusAC} from '../app/app-reducer'
import {loginApi} from '../../api/login/login-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/HandleErrorUtils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoginParametersType} from '../../common/types'


const initialState = {
	isLoggedIn: false
}

const slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
			state.isLoggedIn = action.payload.value
		}
	}
})

export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

// thunks
export const loginTC = (data: LoginParametersType) => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	loginApi.login(data).then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({value: true}))
				dispatch(setStatusAC({status: 'succeeded'}))
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

export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(setStatusAC({status: 'loading'}))
	loginApi.logOut().then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({value: false}))
				dispatch(setStatusAC({status: 'succeeded'}))
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
