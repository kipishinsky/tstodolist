import React, {useCallback, useEffect} from 'react'
import './App.css';
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import {AddNewItemComponent} from '../add-new-item/AddNewItemComponent'
import {
	addTodolistAC,
	changeTodoListFilterAC,
	changeTodoTitleAC, fetchTodolistsThunkCreator, FilterValuesType,
	removeTodolistAC, TodolistsReducerType
} from '../../state/reducers/todolists-reducer/todolists-reducer'
import {
	addTasksAC,
	changeStatusTaskAC,
	changeTitleTaskAC,
	removeTasksAC
} from '../../state/reducers/tasks-reducer/tasks-reducer'
import {RootStateType} from '../../state/store'
import {TaskStatuses, TaskType} from '../../api/tasks/tasks-api'
import {TodoList} from '../todolists/Todolist'

export type AppTasksType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	console.log('AppWithRedux render')

	const dispatch = useDispatch()
	const todolists = useSelector<RootStateType, Array<TodolistsReducerType>>(state => state.todolists)
	const tasks = useSelector<RootStateType, AppTasksType>(state => state.tasks)

	useEffect(() => {
		dispatch(fetchTodolistsThunkCreator())
	}, [])


	// удаление таски по id
	const removeTask = useCallback((taskId: string, todolistId: string) => {
		dispatch(removeTasksAC(taskId, todolistId))
	}, [dispatch])

	// добавление новой таски
	const addNewTask = useCallback((tasksNewTitleInput: string, todoListId: string) => {
		dispatch(addTasksAC(tasksNewTitleInput, todoListId))
	}, [dispatch])

	// change Status - изменить статус таски, изменить статус в isDone
	const changeTaskStatus = useCallback((tasksId: string, status: TaskStatuses, todoListsId: string) => {
		dispatch(changeStatusTaskAC(tasksId, status, todoListsId))
	}, [dispatch])

	// изменение названия таски
	const changeTaskTitle = useCallback((tasksId: string, tasksTitle: string, todoListsId: string) => {
		dispatch(changeTitleTaskAC(tasksId, tasksTitle, todoListsId))
	}, [dispatch])


	// меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
	const changeFilterTodolist = useCallback((filterValue: FilterValuesType, todoListsId: string) => {
		dispatch(changeTodoListFilterAC(todoListsId, filterValue))
	}, [dispatch])

	// удаление тудулиста
	const removeTodoList = useCallback((todoListsId: string) => {
		dispatch(removeTodolistAC(todoListsId))
	}, [dispatch])

	// редактирование тудулиста
	const changeTodoListTitle = useCallback((todoListsId: string, newChangeTitleValue: string) => {
		dispatch(changeTodoTitleAC(todoListsId, newChangeTitleValue))
	}, [dispatch])

	// добавление нового тудулиста
	const addNewTodoList = useCallback((todolistTitleAC: string) => {
		dispatch(addTodolistAC(todolistTitleAC))
	}, [dispatch])


	return (
		<div className={'App'}>

			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu/>
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>


			<Container fixed>

				<Grid container style={{padding: '20px'}}>
					<AddNewItemComponent addNewItem={addNewTodoList}/>
				</Grid>

				<Grid container spacing={3}>

					{todolists.map(tl => {

						let allTodolistTasks = tasks[tl.id];
						let tasksForTodoList = allTodolistTasks;

						if (tl.filter === "Active") {
							tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
						}
						if (tl.filter === "Completed") {
							tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
						}
						return (
							<Grid item>
								<Paper style={{padding: '10px'}}>
									<TodoList
										key={tl.id}
										todolistId={tl.id}
										todolistTitle={tl.title} // заголовки компоненты
										tasks={tasksForTodoList}  // отфильтрованные таски по кнопкам
										removeTask={removeTask} //  удаление таски
										changeFilter={changeFilterTodolist} // юзабельность кнопок all active completed
										addNewTask={addNewTask} // добавление новой таски
										changeTaskStatus={changeTaskStatus} //передаем функцию, чтобы менять статус таске
										changeTaskTitle={changeTaskTitle} //передаем функцию, чтобы менять статус таске
										filterButton={tl.filter} // передаем массив фильтров let [filter, setFilter] = useState <FilterValuesType>
										removeTodoList={removeTodoList}
										changeTodoListTitle={changeTodoListTitle}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>

			</Container>
		</div>
	)
}

export default AppWithRedux


