import {appReducer, AppInitialStateType, setErrorAC, setStatusAC} from './app-reducer'

let startState: AppInitialStateType;

beforeEach( () => {
	startState = {
		status: 'idle',
		error: null
	}
})

test( 'correct status should be set', () => {

	const endState = appReducer(startState, setStatusAC('idle'))

	expect(endState.status).toBe('idle')
})

test( 'correct error should be set', () => {

	const endState = appReducer(startState, setErrorAC('some'))

	expect(endState.error).toBe('some')
})