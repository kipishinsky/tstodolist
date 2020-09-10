import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from '../components/app/app-reducer'
import {Dispatch} from 'redux'
import {ResponseTasksType} from '../api/tasks/tasks-api'

export const handleServerAppError = <D>(data: ResponseTasksType<D>, dispatch: Dispatch<ThunkType>) => {
	if (data.messages.length) {
		dispatch(setErrorAC(data.messages[0]))
	} else {
		dispatch(setErrorAC('some error'))
	}
	dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<ThunkType>) => {
	dispatch(setErrorAC(error.message ? error.message : 'some error occurred'))
	dispatch(setStatusAC('succeeded'))
}


type ThunkType = SetErrorActionType | SetStatusActionType