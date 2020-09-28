import {setStatusAC} from '../../reducers/app/app-reducer'
import {loginApi} from '../../../api/login/login-api'
import {setIsLoggedInAC} from '../../reducers/auth/auth-reducer'
import {handleServerAppError, handleServerNetworkError} from '../handle-error/HandleErrorUtils'

import {Dispatch} from 'redux'
import {LoginParametersType} from '../../../utilities/types/login/login-types'

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
