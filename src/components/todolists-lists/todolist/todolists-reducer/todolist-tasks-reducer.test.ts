import {addTodolistAC, todolistsReducer, TodolistsReducerType} from './todolists-reducer';
import {tasksReducer} from '../tasks-reducer/tasks-reducer';
import {AppTasksType} from "../../../app/App";


test('ids should be equals', () => {
	const startTasksState: AppTasksType = {};
	const startTodolistsState: Array<TodolistsReducerType> = [];
	
	const action = addTodolistAC({
		id: '3',
		title: 'new todolist',
		filter: 'All',
		addedDate: '',
		order: 0
	});
	const endTasksState = tasksReducer (startTasksState, action)
	const endTodolistsState = todolistsReducer (startTodolistsState, action)
	
	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;
	
	expect(idFromTasks).toBe(action.todolist.id);
	expect(idFromTodolists).toBe(action.todolist.id);
});
