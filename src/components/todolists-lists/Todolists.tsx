import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Grid, Paper} from '@material-ui/core'
import {AddNewItemComponent} from '../generic-components/add-new-item/AddNewItemComponent'
import {TodoList} from './todolist/Todolist'
import {changeTodoListFilterAC} from '../../store/reducers/todolists/todolists-reducer'
import {Redirect} from 'react-router-dom'
import {addTasksTC, changeTaskStatusTC, removeTaskTC} from '../../store/thunk/tasks/tasks-thunks'
import {
	addTodolistsTC, changeTodoTitleTC,
	fetchTodolistsThunkCreator, removeTodolistsTC
} from '../../store/thunk/todolists/todolist-thunks'

import {RootStateType} from '../../store/store'
import {AppTasksType} from '../../utilities/types/app/app-types'
import {
	FilterValuesType, TodolistsListPropsType,
	TodolistsReducerType
} from '../../utilities/types/todolists/todolists-types'
import {TaskStatuses} from '../../utilities/types/todolists/tasks/tasks-type'

export const Todolists: React.FC<TodolistsListPropsType> = ({demo = false}) => {

	const dispatch = useDispatch()
	const todolists = useSelector<RootStateType, Array<TodolistsReducerType>>(state => state.todolists)
	const tasks = useSelector<RootStateType, AppTasksType>(state => state.tasks)
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)

	useEffect(() => {
		if (demo || !isLoggedIn) {
			return
		}
		dispatch(fetchTodolistsThunkCreator())
	}, [isLoggedIn])


	const removeTask = useCallback((taskId: string, todolistId: string) => {
		dispatch(removeTaskTC(taskId, todolistId))
	}, [])

	const addNewTask = useCallback((tasksNewTitleInput: string, todoListId: string) => {
		dispatch(addTasksTC(tasksNewTitleInput, todoListId))
	}, [])

	const changeTaskStatus = useCallback((tasksId: string, status: TaskStatuses, todoListsId: string) => {
		dispatch(changeTaskStatusTC(tasksId, {status}, todoListsId))
	}, [])

	const changeTaskTitle = useCallback((tasksId: string, tasksTitle: string, todoListsId: string) => {
		dispatch(changeTaskStatusTC(tasksId, {title: tasksTitle}, todoListsId))
	}, [])


	const changeFilterTodolist = useCallback((id: string, filterValue: FilterValuesType) => {
		dispatch(changeTodoListFilterAC({id, filterValue}))
	}, [])

	const removeTodoList = useCallback((todoListsId: string) => {
		dispatch(removeTodolistsTC(todoListsId))
	}, [])

	const changeTodoListTitle = useCallback((todoListsId: string, newChangeTitleValue: string) => {
		dispatch(changeTodoTitleTC(todoListsId, newChangeTitleValue))
	}, [])

	const addNewTodoList = useCallback((title: string) => {
		dispatch(addTodolistsTC(title))
	}, [])

	if (!isLoggedIn) return <Redirect to={'/auth'}/>

	return (
		<>
			<Grid container style={{padding: '20px'}}>
				<AddNewItemComponent addNewItem={addNewTodoList}/>
			</Grid>

			<Grid container spacing={3}>

				{todolists.map(tl => {

					let allTodolistTasks = tasks[tl.id]
					let tasksForTodoList = allTodolistTasks

					if (tl.filter === 'Active') {
						tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
					}
					if (tl.filter === 'Completed') {
						tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
					}
					return (
						<Grid item>
							<Paper style={{padding: '10px'}}>
								<TodoList
									key={tl.id}
									todolist={tl}
									tasks={tasksForTodoList}
									removeTask={removeTask}
									changeFilterTodoist={changeFilterTodolist}
									addNewTask={addNewTask}
									changeTaskStatus={changeTaskStatus}
									changeTaskTitle={changeTaskTitle}
									removeTodoList={removeTodoList}
									changeTodoListTitle={changeTodoListTitle}
									demo={demo}
								/>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}