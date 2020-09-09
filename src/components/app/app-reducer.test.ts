import {appReducer, InitialStateType, setStatusAC} from './app-reducer'

let startState: InitialStateType;

beforeEach( () => {
	startState = {
		status: 'idle'
	}
})

test( 'correct status should be set', () => {

	const endState = appReducer(startState, setStatusAC('idle'))

	expect(endState.status).toBe('idle')
})
