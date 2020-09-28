import {appReducer, setErrorAC, setStatusAC} from './app-reducer'
import {AppInitialStateType} from '../../../utilities/types/app/app-types'

let startState: AppInitialStateType;

beforeEach( () => {
	startState = {
		status: 'idle',
		error: null,
		initialized: true
	}
})

test( 'correct status should be set', () => {

	const endState = appReducer(startState, setStatusAC({status: 'idle'}))

	expect(endState.status).toBe('idle')
})

test( 'correct error should be set', () => {

	const endState = appReducer(startState, setErrorAC({error: 'some'}))

	expect(endState.error).toBe('some')
})