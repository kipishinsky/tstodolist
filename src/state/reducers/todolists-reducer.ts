import {FilterValuesType, TodoListsType} from '../../AppWithReducers';
import {v1} from 'uuid';


export type removeTodoListActionType = {
	type: 'REMOVE-TODOLIST',
	todolistIdAC: string
}

export type addTodoListActionType = {
	type: 'ADD-TODOLIST',
	todolistIdAC: string,
	todolistTitleAC: string
}

export type changeTodoListActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	todolistIdAC: string,
	todolistTitleAC: string,
	todolistFilterAC: FilterValuesType
}

export type changeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	todolistIdAC: string,
	todolistFilterAC: FilterValuesType
}

type ActionType =
	removeTodoListActionType |
	addTodoListActionType |
	changeTodoListActionType |
	changeTodoListFilterActionType
;


export let todoListId1 = v1();
export let todoListId2 = v1();


const initialState: Array<TodoListsType> = [
	{
		todolistId: todoListId1,
		todolistTitle: 'What to learn',
		todolistFilter: 'All'
	},
	{
		todolistId: todoListId2,
		todolistTitle: 'What to buy',
		todolistFilter: 'All'
	}
]


export const todoListsReducer = (state: Array<TodoListsType> = initialState, action: ActionType): Array<TodoListsType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST' : {
			return state.filter(st => st.todolistId !== action.todolistIdAC)
		}
		case 'ADD-TODOLIST' : {
			return [...state, {
				todolistId: action.todolistIdAC,
				todolistTitle: action.todolistTitleAC,
				todolistFilter: 'All'
			}]
		}
		case 'CHANGE-TODOLIST-TITLE' : {
			let todoList = state.find(st => st.todolistId === action.todolistIdAC)
			if (todoList) {
				todoList.todolistTitle = action.todolistTitleAC
				return [...state]
			}
		}
		case 'CHANGE-TODOLIST-FILTER' : {
			let newState = state.find(st => st.todolistId === action.todolistIdAC)
			if (newState) {
				newState.todolistFilter = action.todolistFilterAC
				return [...state]
			}
		}
		default:
			return state
	}
}

export const removeTodolistAC = (todolistId: string): removeTodoListActionType => {
	return {type: 'REMOVE-TODOLIST', todolistIdAC: todolistId}
}

export const addTodoListAC = (todolistTitleAC: string,): addTodoListActionType => {
	return {type: 'ADD-TODOLIST', todolistTitleAC, todolistIdAC: v1()}
}

export const changeTodoTitleAC = (todoListId2: string, newTodoListTitle: string): changeTodoListActionType => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		todolistIdAC: todoListId2,
		todolistTitleAC: newTodoListTitle,
		todolistFilterAC: 'All'
	}
}

export const changeTodoListFilterAC = (todoListId2: string, filterValue: FilterValuesType): changeTodoListFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', todolistFilterAC: filterValue, todolistIdAC: todoListId2}
}

