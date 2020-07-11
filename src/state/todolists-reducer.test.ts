/*
 TDD Test-Driven Development
 разработка по средствам тестирования
 */

import {
	addTodoListAT,
	changeTodoListAT,
	changeTodoListFilterAT,
	removeTodolistAT,
	todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {AppFilterValuesType, AppTodoListsHookType} from '../App';

test ('correct todoList should be removed', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsId: todoListId1, todoListsTitle: "What to learn", todoListsFilter: "All"},
		{todoListsId: todoListId2, todoListsTitle: "What to buy", todoListsFilter: "All"}
	]
	
	const endState = todoListsReducer(startState, removeTodolistAT(todoListId1))
	
	expect(endState.length).toBe(1);
	expect(endState[0].todoListsId).toBe(todoListId2);
});


test('correct todoList should be added', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newTodoListTitle = "New TodoList";
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsId: todoListId1, todoListsTitle: "What to learn", todoListsFilter: "All"},
		{todoListsId: todoListId2, todoListsTitle: "What to buy", todoListsFilter: "All"}
	]

	const endState = todoListsReducer(startState, addTodoListAT(newTodoListTitle, todoListId2) )
	
	expect(endState.length).toBe(3);
	expect(endState[2].todoListsTitle).toBe(newTodoListTitle);
	expect(endState[2].todoListsFilter).toBe("All");
});


test('correct todoList should change its name', () => {
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newTodoListTitle = "New TodoList";
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsId: todoListId1, todoListsTitle: "What to learn", todoListsFilter: "All"},
		{todoListsId: todoListId2, todoListsTitle: "What to buy", todoListsFilter: "All"}
	]
	
	const endState = todoListsReducer(startState, changeTodoListAT(todoListId2, newTodoListTitle));
	
	expect(endState[0].todoListsTitle).toBe("What to learn");
	expect(endState[1].todoListsTitle).toBe(newTodoListTitle);
});


test('correct filter of todoList should be changed', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newFilter: AppFilterValuesType = "Completed";
	
	const startState: Array<AppTodoListsHookType> = [
		{todoListsId: todoListId1, todoListsTitle: "What to learn", todoListsFilter: "All"},
		{todoListsId: todoListId2, todoListsTitle: "What to buy", todoListsFilter: "All"}
	]
/*
	const action: ChangeTodoListFilterActionType = {
		type: 'CHANGE-TODOLIST-FILTER' as const,
		id: todoListId2,
		filter: newFilter
	};*/
	
	const endState = todoListsReducer(startState, changeTodoListFilterAT(todoListId2, newFilter));
	
	expect(endState[0].todoListsFilter).toBe("All");
	expect(endState[1].todoListsFilter).toBe(newFilter);
});



