import {
	addTodolistAC, changeTodoTitleAC, changeTodoListFilterAC, removeTodolistAC,
	todolistsReducer, setTodolistsAC, changeTodolistEntityStatusAC
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodolistsReducerType, TodolistType} from '../../../utilities/types/todolists/todolists-types'
import {RequestStatusType} from '../../../utilities/types/error-status/err-st-types'

test('correct todoList should be removed', () => {

	let todoListId1 = v1()
	let todoListId2 = v1()

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
	]

	const endState = todolistsReducer(startState, removeTodolistAC({id: todoListId1}))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todoListId2)
})

test('correct todoList should be added', () => {

	let todoListId1 = v1()
	let todoListId2 = v1()

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
	]

	const todolist: TodolistType = {
		id: v1(),
		title: 'new todolist',
		filter: 'All',
		addedDate: '',
		order: 0
	}

	const endState = todolistsReducer(startState, addTodolistAC({todolist}))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe('new todolist')
	expect(endState[0].filter).toBe('All')
	expect(endState[0].id).toBeDefined()
})

test('correct todoList should change its name', () => {
	let todoListId1 = v1()
	let todoListId2 = v1()

	let newTodoListTitle = 'New TodoList'

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
	]

	const endState = todolistsReducer(startState, changeTodoTitleAC({id: todoListId2, changeTitle: newTodoListTitle}))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todoList should be changed', () => {
	let todoListId1 = v1()
	let todoListId2 = v1()

	let newFilter: FilterValuesType = 'Completed'

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
	]

	const endState = todolistsReducer(startState, changeTodoListFilterAC({id: todoListId2, filterValue: newFilter}))

	expect(endState[0].filter).toBe('All')
	expect(endState[1].filter).toBe(newFilter)
})

test('todolists-lists should be set to the state', () => {
	let todoListId1 = v1()
	let todoListId2 = v1()

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
	]

	const action = setTodolistsAC({todolists: startState})
	const endState = todolistsReducer([], action)

	const keys = Object.keys(endState)
	expect(keys.length).toBe(2)
})

test('correct entity status of todoList should be changed', () => {
	let todoListId1 = v1()
	let todoListId2 = v1()

	const startState: Array<TodolistsReducerType> = [
		{id: todoListId1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
		{id: todoListId2, title: 'What to buy', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
	]

	let newStatus: RequestStatusType = 'loading'

	const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({id: todoListId2, status: newStatus}))

	expect(endState[0].entityStatus).toBe('idle')
	expect(endState[1].entityStatus).toBe(newStatus)
})