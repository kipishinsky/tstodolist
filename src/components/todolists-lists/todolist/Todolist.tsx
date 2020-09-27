import React, {useCallback, useEffect} from 'react'
import {AddNewItemComponent} from '../../add-new-item/AddNewItemComponent'
import {ChangeTitleNameComponent} from '../../change-title-item/ChangeTitleNameComponent'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './tasks/Task'
import {getTasksThunkCreator} from './tasks-reducer/tasks-reducer'
import {useDispatch} from 'react-redux'
import {TaskStatuses, TodolistPropsType} from '../../../common/types'

export const TodoList = React.memo(function ({demo = false, ...props}: TodolistPropsType) {
	console.log(' TodoList render')
	const dispatch = useDispatch()

	useEffect(() => {
		if (demo) {
			return
		}
		console.log('log  ' + props.todolist.id)
		dispatch(getTasksThunkCreator(props.todolist.id))
	}, [])


	const addNewTask = useCallback((title: string) => {
		props.addNewTask(title, props.todolist.id)
	}, [props.addNewTask, props.todolist.id])


	const onClickAllButton = useCallback(() => {
		props.changeFilterTodoist(props.todolist.id, 'All')
	}, [props.changeFilterTodoist, props.todolist.id])
	const onClickActiveButton = useCallback(() => {
		props.changeFilterTodoist(props.todolist.id, 'Active')
	}, [props.changeFilterTodoist, props.todolist.id])
	const onClickComletedButton = useCallback(() => {
		props.changeFilterTodoist(props.todolist.id, 'Completed')
	}, [props.changeFilterTodoist, props.todolist.id])


	const removeTodoListCallBack = () => {
		props.removeTodoList(props.todolist.id)
	}

	const changeTodoListTitleCallBack = useCallback((newChangeTitleValue: string) => {
		props.changeTodoListTitle(props.todolist.id, newChangeTitleValue)
	}, [props.changeTodoListTitle, props.todolist.id])

	let tasksForTodoList = props.tasks
	if (props.todolist.filter === 'Active') {
		tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
	}
	if (props.todolist.filter === 'Completed') {
		tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	return (
		<div>
			<h3>
				<ChangeTitleNameComponent
					changeTitleValue={props.todolist.title}
					onChange={changeTodoListTitleCallBack}
				/>
				<IconButton
					onClick={removeTodoListCallBack}
					disabled={props.todolist.entityStatus === 'loading'}>
					<Delete/>
				</IconButton>
			</h3>

			<AddNewItemComponent
				addNewItem={addNewTask}
				disabled={props.todolist.entityStatus === 'loading'}/>
			<ul>
				{props.tasks.map((t) => <Task
					task={t}
					changeTaskStatus={props.changeTaskStatus}
					changeTaskTitle={props.changeTaskTitle}
					removeTask={props.removeTask}
					todolistId={props.todolist.id}
					key={t.id}
				/>)
				}
			</ul>
			<div>
				<Button
					variant={props.todolist.filter === 'All' ? 'contained' : 'text'}
					onClick={onClickAllButton}
					color={'inherit'}>All</Button>
				<Button
					variant={props.todolist.filter === 'Active' ? 'contained' : 'text'}
					onClick={onClickActiveButton}
					color={'primary'}>Active</Button>
				<Button
					variant={props.todolist.filter === 'Completed' ? 'contained' : 'text'}
					onClick={onClickComletedButton}
					color={'secondary'}>Completed</Button>
			</div>
		</div>
	)
})


