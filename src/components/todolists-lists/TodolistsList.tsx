import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../app/store";
import {
	addTodolistsTC,
	changeTodoListFilterAC,
	changeTodoTitleTC,
	fetchTodolistsThunkCreator,
	FilterValuesType,
	removeTodolistsTC,
	TodolistsReducerType
} from "./todolist/todolists-reducer/todolists-reducer";
import {addTasksTC, changeTaskStatusTC, removeTaskTC} from "./todolist/tasks-reducer/tasks-reducer";
import {TaskStatuses} from "../../api/tasks/tasks-api";
import {Grid, Paper} from "@material-ui/core";
import {AddNewItemComponent} from "../add-new-item/AddNewItemComponent";
import {TodoList} from "./todolist/Todolist";
import {AppTasksType} from "../app/App";

export const TodolistsList: React.FC = () => {

	const dispatch = useDispatch()
	const todolists = useSelector<RootStateType, Array<TodolistsReducerType>>(state => state.todolists)
	const tasks = useSelector<RootStateType, AppTasksType>(state => state.tasks)

	useEffect(() => {
		dispatch(fetchTodolistsThunkCreator())
	}, [])


	// удаление таски по id
	const removeTask = useCallback((taskId: string, todolistId: string) => {
		dispatch(removeTaskTC(taskId, todolistId))
	}, [])

	// добавление новой таски
	const addNewTask = useCallback((tasksNewTitleInput: string, todoListId: string) => {
		dispatch(addTasksTC(tasksNewTitleInput, todoListId))
	}, [])

	// change Status - изменить статус таски, изменить статус в isDone
	const changeTaskStatus = useCallback((tasksId: string, status: TaskStatuses, todoListsId: string) => {
		dispatch(changeTaskStatusTC(tasksId, {status}, todoListsId))
	}, [])

	// изменение названия таски
	const changeTaskTitle = useCallback((tasksId: string, tasksTitle: string, todoListsId: string) => {
		dispatch(changeTaskStatusTC(tasksId, {title: tasksTitle}, todoListsId))
	}, [])


	// меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
	const changeFilterTodolist = useCallback((filterValue: FilterValuesType, todoListsId: string) => {
		dispatch(changeTodoListFilterAC(todoListsId, filterValue))
	}, [])

	// удаление тудулиста
	const removeTodoList = useCallback((todoListsId: string) => {
		dispatch(removeTodolistsTC(todoListsId))
	}, [])

	// редактирование тудулиста
	const changeTodoListTitle = useCallback((todoListsId: string, newChangeTitleValue: string) => {
		dispatch(changeTodoTitleTC(todoListsId, newChangeTitleValue))
	}, [])

	// добавление нового тудулиста
	const addNewTodoList = useCallback((title: string) => {
		dispatch(addTodolistsTC(title))
	}, [])

	return (
		<>
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
		</>
	)
}