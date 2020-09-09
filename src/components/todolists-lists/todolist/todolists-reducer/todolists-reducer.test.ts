/*
 TDD Test-Driven Development
 разработка по средствам тестирования
 */
import {
	addTodolistAC, changeTodoTitleAC, changeTodoListFilterAC, removeTodolistAC,
	todolistsReducer, TodolistsReducerType, FilterValuesType, setTodolistsAC
} from './todolists-reducer'
import {v1} from 'uuid'


test('correct todoList should be removed', () => {

	let todoListId1 = v1()
	let todoListId2 = v1()

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}
	]

	const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todoListId2)
})


test('correct todoList should be added', () => {

	let todoListId1 = v1()
	let todoListId2 = v1()

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}
	]

	const endState = todolistsReducer(startState, addTodolistAC({
		id: '3',
		title: 'new todolist',
		filter: 'All',
		addedDate: '',
		order: 0
	}))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe('new todolist')
	expect(endState[2].filter).toBe('All')
	expect(endState[2].id).toBeDefined()
})


test('correct todoList should change its name', () => {
	let todoListId1 = v1()
	let todoListId2 = v1()

	let newTodoListTitle = 'New TodoList'

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}
	]

	const endState = todolistsReducer(startState, changeTodoTitleAC(todoListId2, newTodoListTitle))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodoListTitle)
})


test('correct filter of todoList should be changed', () => {

	let todoListId1 = v1()
	let todoListId2 = v1()

	let newFilter: FilterValuesType = 'Completed'

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}
	]

	const endState = todolistsReducer(startState, changeTodoListFilterAC(todoListId2, newFilter))

	expect(endState[0].filter).toBe('All')
	expect(endState[1].filter).toBe(newFilter)
})

test('todolists-lists should be set to the state', () => {

	let todoListId1 = v1()
	let todoListId2 = v1()

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}
	]

	const action = setTodolistsAC(startState)
	const endState = todolistsReducer([], action)

	const keys = Object.keys(endState)
	expect(keys.length).toBe(2)
})
