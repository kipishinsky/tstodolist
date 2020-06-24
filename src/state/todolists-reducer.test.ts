/*
 TDD Test-Driven Development
 разработка по средствам тестирования
 */

import {
	AddTodoListAT,
	ChangeTodoListAT,
	ChangeTodoListFilterAT, RemoveTodolistAT,
	todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {AppFilterValuesType, AppTodoListsHookType} from '../App';

test ('correct todoList should be removed', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsHookID: todoListId1, todoListsHookTITLE: "What to learn", todoListsHookFILTER: "All"},
		{todoListsHookID: todoListId2, todoListsHookTITLE: "What to buy", todoListsHookFILTER: "All"}
	]
	
	const endState = todoListsReducer(startState, RemoveTodolistAT(todoListId1))
	
	expect(endState.length).toBe(1);
	expect(endState[0].todoListsHookID).toBe(todoListId2);
});


test('correct todoList should be added', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newTodoListTitle = "New TodoList";
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsHookID: todoListId1, todoListsHookTITLE: "What to learn", todoListsHookFILTER: "All"},
		{todoListsHookID: todoListId2, todoListsHookTITLE: "What to buy", todoListsHookFILTER: "All"}
	]

	const endState = todoListsReducer(startState, AddTodoListAT(newTodoListTitle, todoListId2) )
	
	expect(endState.length).toBe(3);
	expect(endState[2].todoListsHookTITLE).toBe(newTodoListTitle);
	expect(endState[2].todoListsHookFILTER).toBe("All");
});


test('correct todoList should change its name', () => {
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newTodoListTitle = "New TodoList";
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsHookID: todoListId1, todoListsHookTITLE: "What to learn", todoListsHookFILTER: "All"},
		{todoListsHookID: todoListId2, todoListsHookTITLE: "What to buy", todoListsHookFILTER: "All"}
	]
	
	const endState = todoListsReducer(startState, ChangeTodoListAT(todoListId2, newTodoListTitle));
	
	expect(endState[0].todoListsHookTITLE).toBe("What to learn");
	expect(endState[1].todoListsHookTITLE).toBe(newTodoListTitle);
});


test('correct filter of todoList should be changed', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newFilter: AppFilterValuesType = "Completed";
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsHookID: todoListId1, todoListsHookTITLE: "What to learn", todoListsHookFILTER: "All"},
		{todoListsHookID: todoListId2, todoListsHookTITLE: "What to buy", todoListsHookFILTER: "All"}
	]
/*
	const action: ChangeTodoListFilterActionType = {
		type: 'CHANGE-TODOLIST-FILTER' as const,
		id: todoListId2,
		filter: newFilter
	};*/
	
	const endState = todoListsReducer(startState, ChangeTodoListFilterAT(todoListId2, newFilter));
	
	expect(endState[0].todoListsHookFILTER).toBe("All");
	expect(endState[1].todoListsHookFILTER).toBe(newFilter);
});



