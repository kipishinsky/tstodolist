import {combineReducers, createStore} from 'redux';
import {todoListsReducer} from './reducers/todolists-reducer';
import {tasksReducer} from './reducers/tasks-reducer';


const rootReducer = combineReducers({
	todolists: todoListsReducer,
	tasks: tasksReducer
})


export type RootStateType = ReturnType <typeof rootReducer>


export const store = createStore(rootReducer)


// @ts-ignore
window.store = store