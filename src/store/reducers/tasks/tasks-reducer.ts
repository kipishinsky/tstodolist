import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../todolists/todolists-reducer'
import {AppTasksType} from '../../../utilities/types/app/app-types'
import {TaskType, UpdateDomainTaskType} from '../../../utilities/types/todolists/tasks/tasks-type'

const initialState: AppTasksType = {}

const slice = createSlice({
	name: 'todolist',
	initialState: initialState,
	reducers: {
		removeTasksAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
			if (index > -1) {
				tasks.splice(index, 1)
			}
		},
		addTasksAC(state, action: PayloadAction<{ task: TaskType }>) {
			state[action.payload.task.todoListId].unshift(action.payload.task)
		},
		updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskType, todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
			if (index > -1) {
				tasks[index] = {...tasks[index], ...action.payload.model}
			}
		},
		changeTitleTaskAC(state, action: PayloadAction<{ taskId: string, newTitleTask: string, todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
			if (index > -1) {
				tasks[index] = {...tasks[index], title: action.payload.newTitleTask}
			}
		},
		setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
			state[action.payload.todolistId] = action.payload.tasks
		}
	},
	extraReducers(builder) {
		builder.addCase(addTodolistAC, (state, action) => {
			state[action.payload.todolist.id] = []
		})
		builder.addCase(removeTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		builder.addCase(setTodolistsAC, (state, action) => {
			action.payload.todolists.forEach((tl: any) => {
				state[tl.id] = []
			})
		})
	}
})

export const tasksReducer = slice.reducer

//action
export const {removeTasksAC, addTasksAC,
	updateTaskAC, changeTitleTaskAC, setTasksAC} = slice.actions
