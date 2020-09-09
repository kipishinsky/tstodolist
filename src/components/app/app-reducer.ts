
const initialState: InitialStateType = {
	status: 'loading',
	error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		case 'APP/SET-ERROR':
			return {...state, error: action.error}
		default:
			return state
	}
}


export const setStatusAC = (status: RequestStatusType) => ({
	type: 'APP/SET-STATUS', status
}) as const

export const setErrorAC = (error: string | null) => ({
	type: 'APP/SET-ERROR', error
}) as const




export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status: RequestStatusType,
	error: string | null
}

export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>

type ActionsType =
	| SetErrorActionType
	| SetStatusActionType
