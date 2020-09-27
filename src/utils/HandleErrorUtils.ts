import {setErrorAC, setStatusAC} from '../components/app/app-reducer'
import {Dispatch} from 'redux'
import {} from '../api/tasks/tasks-api'
import {ResponseTasksType} from '../common/types'

export const handleServerAppError = <D>(data: ResponseTasksType<D>, dispatch: Dispatch) => {
	if (data.messages.length) {

		dispatch(setErrorAC({error: data.messages[0]}))
	} else {
		dispatch(setErrorAC({error: 'some error'}))
	}
	dispatch(setStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
	dispatch(setErrorAC(error.message ? error.message : 'some error occurred'))
	dispatch(setStatusAC({status: 'succeeded'}))
}


