import {
	addTasksAC,
	updateTaskAC,
	changeTitleTaskAC,
	removeTasksAC,
	setTasksAC,
	tasksReducer
} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../todolists/todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType} from '../../../utilities/types/todolists/tasks/tasks-type'

import {AppTasksType} from '../../../utilities/types/app/app-types'
import {TodolistType} from '../../../utilities/types/todolists/todolists-types'

test('correct task should be deleted from correct array', () => {
	const startState: AppTasksType = {
		'todolistId1': todolistTask1,
		'todolistId2': todolistTask2
	}

	const action = removeTasksAC({taskId: '2', todolistId: 'todolistId2'})

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(2)
	expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
	const startState: AppTasksType = {
		'todolistId1': todolistTask1,
		'todolistId2': todolistTask2
	}

	const task: TaskType = {
		id: '4',
		title: 'juce',
		status: TaskStatuses.New,
		todoListId: 'todolistId2',
		priority: TaskPriorities.Low,
		completed: false,
		description: '',
		startDate: '',
		deadline: '',
		order: 0,
		addedDate: ''
	}

	const action = addTasksAC({task})

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juce')
	expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
	const startState: AppTasksType = {
		'todolistId1': todolistTask1,
		'todolistId2': todolistTask2
	}

	const action = updateTaskAC({taskId: '2', model: {status: TaskStatuses.New}, todolistId: 'todolistId2'})

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][1].id).toBeDefined()
	expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
	const startState: AppTasksType = {
		'todolistId1': todolistTask1,
		'todolistId2': todolistTask2
	}

	const action = changeTitleTaskAC({taskId: '2', newTitleTask: 'newTitleTask', todolistId: 'todolistId2'})

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][1].id).toBeDefined()
	expect(endState['todolistId2'][1].title).toBe('newTitleTask')
	expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
})

test('new array should be added when new todolist is added', () => {
	const startState: AppTasksType = {
		'todolistId1': todolistTask1,
		'todolistId2': todolistTask2
	}

	const todolist: TodolistType = {
		id: '1',
		title: 'new todolist',
		filter: 'All',
		addedDate: '',
		order: 0
	}

	const action = addTodolistAC({todolist})

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toStrictEqual([])
})

test('property with todolistId should be deleted', () => {
	const startState: AppTasksType = {
		'todolistId1': todolistTask1,
		'todolistId2': todolistTask2
	}

	const action = removeTodolistAC({id: 'todolistId2'})

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists-lists', () => {
	const todolists: Array<TodolistType> = [
		{id: '1', title: 'title 1', filter: 'All', order: 0, addedDate: ''},
		{id: '2', title: 'title 2', filter: 'All', order: 0, addedDate: ''}
	]

	const action = setTodolistsAC({todolists})

	const endState = tasksReducer({}, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(2)
	expect(endState['1']).toStrictEqual([])
	expect(endState['2']).toStrictEqual([])
})

test('task should be added for todolist', () => {
	const tasks: Array<TaskType> = todolistTask1

	const action = setTasksAC({tasks, todolistId: 'todolistId1'})

	const endState = tasksReducer({
		'todolistId2': [],
		'todolistId1': []
	}, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(0)
})

const todolistTask1 = [
	{
		id: '1',
		title: 'CSS',
		status: TaskStatuses.New,
		todoListId: 'todolistId1',
		priority: TaskPriorities.Low,
		completed: false,
		description: '',
		startDate: '',
		deadline: '',
		order: 0,
		addedDate: ''
	},
	{
		id: '2',
		title: 'js',
		status: TaskStatuses.New,
		todoListId: 'todolistId1',
		priority: TaskPriorities.Low,
		completed: false,
		description: '',
		startDate: '',
		deadline: '',
		order: 0,
		addedDate: ''
	},
	{
		id: '3',
		title: 'REACT',
		status: TaskStatuses.New,
		todoListId: 'todolistId1',
		priority: TaskPriorities.Low,
		completed: false,
		description: '',
		startDate: '',
		deadline: '',
		order: 0,
		addedDate: ''
	}
]

const todolistTask2 = [
	{
		id: '1',
		title: 'Beard',
		status: TaskStatuses.New,
		todoListId: 'todolistId2',
		priority: TaskPriorities.Low,
		completed: false,
		description: '',
		startDate: '',
		deadline: '',
		order: 0,
		addedDate: ''
	},
	{
		id: '2',
		title: 'milk',
		status: TaskStatuses.Completed,
		todoListId: 'todolistId2',
		priority: TaskPriorities.Low,
		completed: false,
		description: '',
		startDate: '',
		deadline: '',
		order: 0,
		addedDate: ''
	},
	{
		id: '3',
		title: 'tea',
		status: TaskStatuses.New,
		todoListId: 'todolistId2',
		priority: TaskPriorities.Low,
		completed: false,
		description: '',
		startDate: '',
		deadline: '',
		order: 0,
		addedDate: ''
	}
]