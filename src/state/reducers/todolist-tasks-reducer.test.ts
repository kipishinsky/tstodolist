import {AppTasksType, TodoListsType} from '../../old app/AppWithReducers';
import {addTodoListAC, todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


test('ids should be equals', () => {
	const startTasksState: AppTasksType = {};
	const startTodolistsState: Array<TodoListsType> = [];
	
	const action = addTodoListAC('new todolist');
	const endTasksState = tasksReducer (startTasksState, action)
	const endTodolistsState = todoListsReducer (startTodolistsState, action)
	
	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].todolistId;
	
	expect(idFromTasks).toBe(action.todolistIdAC);
	expect(idFromTodolists).toBe(action.todolistIdAC);
});
