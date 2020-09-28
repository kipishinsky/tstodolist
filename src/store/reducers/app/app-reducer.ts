import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppInitialStateType} from '../../../utilities/types/app/app-types'
import {RequestStatusType} from '../../../utilities/types/error-status/err-st-types'

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

//action
export const {setStatusAC, setErrorAC, setAppInitializedAC} = slice.actions
