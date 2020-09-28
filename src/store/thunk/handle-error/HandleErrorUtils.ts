import {setErrorAC, setStatusAC} from '../../reducers/app/app-reducer'
import {Dispatch} from 'redux'
import {ResponseTasksType} from '../../../utilities/types/todolists/tasks/tasks-type'

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


