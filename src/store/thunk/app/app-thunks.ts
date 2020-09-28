import {loginApi} from '../../../api/login/login-api'
import {setIsLoggedInAC} from '../../reducers/auth/auth-reducer'
import {setAppInitializedAC, setStatusAC} from '../../reducers/app/app-reducer'
import {Dispatch} from 'redux'

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