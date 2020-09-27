import {Dispatch} from 'redux'
import {loginApi} from '../../api/login/login-api'
import {setIsLoggedInAC} from '../login/auth-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppInitialStateType, RequestStatusType} from '../../common/types'

const initialState: AppInitialStateType = {
	status: 'loading',
	error: null,
	initialized: false
}

const slice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {
		setStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
			state.status = action.payload.status
		},
		setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
			state.error = action.payload.error
		},
		setAppInitializedAC(state, action: PayloadAction<{ init: boolean }>) {
			state.initialized = action.payload.init
		}
	}
})

export const appReducer = slice.reducer

export const setStatusAC = slice.actions.setStatusAC
export const setErrorAC = slice.actions.setErrorAC
export const setAppInitializedAC = slice.actions.setAppInitializedAC

//thunk
export const initializedAppTC = () => (dispatch: Dispatch) => {
	loginApi.getStatusMe().then(res => {
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC({value: true}))
			dispatch(setStatusAC({status: 'succeeded'}))
		}
		dispatch(setAppInitializedAC({init: true}))
		dispatch(setStatusAC({status: 'succeeded'}))
	})
}
