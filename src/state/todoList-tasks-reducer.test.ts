import {AppTasksHookType, AppTodoListsHookType} from '../App';
import {addTodoListAT, todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


test('ids should be equals', () => {
	const startTasksState: AppTasksHookType = {};
	const startTodolistsState: Array<AppTodoListsHookType> = [];
	
	const action = addTodoListAT("new todolist");
	
	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todoListsReducer(startTodolistsState, action)
	
	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].todoListsId;
	
	expect(idFromTasks).toBe(action.todoListId);
	expect(idFromTodolists).toBe(action.todoListId);
});
