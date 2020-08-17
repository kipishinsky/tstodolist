import {addTodolistAC, todolistsReducer, TodolistsReducerType} from './todolists-reducer';
import {tasksReducer} from '../tasks-reducer/tasks-reducer';
import {AppTasksType} from "../../../components/app/AppWithRedux";


test('ids should be equals', () => {
	const startTasksState: AppTasksType = {};
	const startTodolistsState: Array<TodolistsReducerType> = [];
	
	const action = addTodolistAC('new todolist');
	const endTasksState = tasksReducer (startTasksState, action)
	const endTodolistsState = todolistsReducer (startTodolistsState, action)
	
	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;
	
	expect(idFromTasks).toBe(action.idAC);
	expect(idFromTodolists).toBe(action.idAC);
});
