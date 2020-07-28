/*
 TDD Test-Driven Development
 разработка по средствам тестирования
 */

import {
	addTodoListAC,
	changeTodoTitleAC,
	changeTodoListFilterAC,
	removeTodolistAC,
	todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListsType} from '../../old app/AppWithReducers';

test ('correct todoList should be removed', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	const startState: Array<TodoListsType> = [
		{todolistId: todoListId1, todolistTitle: "What to learn", todolistFilter: "All"},
		{todolistId: todoListId2, todolistTitle: "What to buy", todolistFilter: "All"}
	]
	
	const endState = todoListsReducer(startState, removeTodolistAC(todoListId1))
	
	expect(endState.length).toBe(1);
	expect(endState[0].todolistId).toBe(todoListId2);
});


test('correct todoList should be added', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newTodoListTitle = "New TodoList";
	
	const startState: Array<TodoListsType> = [
		{todolistId: todoListId1, todolistTitle: "What to learn", todolistFilter: "All"},
		{todolistId: todoListId2, todolistTitle: "What to buy", todolistFilter: "All"}
	]

	const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle) )
	
	expect(endState.length).toBe(3);
	expect(endState[2].todolistTitle).toBe(newTodoListTitle);
	expect(endState[2].todolistFilter).toBe("All");
	expect(endState[2].todolistId).toBeDefined();
});


test('correct todoList should change its name', () => {
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newTodoListTitle = "New TodoList";
	
	const startState: Array<TodoListsType> = [
		{todolistId: todoListId1, todolistTitle: "What to learn", todolistFilter: "All"},
		{todolistId: todoListId2, todolistTitle: "What to buy", todolistFilter: "All"}
	]
	
	const endState = todoListsReducer(startState, changeTodoTitleAC(todoListId2, newTodoListTitle));
	
	expect(endState[0].todolistTitle).toBe("What to learn");
	expect(endState[1].todolistTitle).toBe(newTodoListTitle);
});


test('correct filter of todoList should be changed', () => {
	
	let todoListId1 = v1();
	let todoListId2 = v1();
	
	let newFilter: FilterValuesType = "Completed";
	
	const startState: Array<TodoListsType> = [
		{todolistId: todoListId1, todolistTitle: "What to learn", todolistFilter: "All"},
		{todolistId: todoListId2, todolistTitle: "What to buy", todolistFilter: "All"}
	]
	
	const endState = todoListsReducer(startState, changeTodoListFilterAC (todoListId2, newFilter));
	
	expect(endState[0].todolistFilter).toBe("All");
	expect(endState[1].todolistFilter).toBe(newFilter);
});



