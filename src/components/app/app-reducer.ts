const initialState: InitialStateType = {
	status: 'loading',
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		default:
			return state
	}
}


export const setStatusAC = (status: string) => ({
	type: 'APP/SET-STATUS', status
}) as const

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status: RequestStatusType
}

type ActionsType = any
