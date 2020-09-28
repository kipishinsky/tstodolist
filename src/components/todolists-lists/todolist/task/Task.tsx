import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {ChangeTitleNameComponent} from '../../../generic-components/change-title-item/ChangeTitleNameComponent'
import {Delete} from '@material-ui/icons'
import {TaskPropsType, TaskStatuses} from '../../../../utilities/types/todolists/tasks/tasks-type'

export const Task = React.memo((props: TaskPropsType) => {

	const onClickHandler = () => {
		return props.removeTask(props.task.id, props.todolistId)
	}

	const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
	}

	const onChangeTitle = useCallback((newItemValue: string) => {
		props.changeTaskTitle(props.task.id, newItemValue, props.todolistId)
	}, [props.changeTaskTitle, props.task.id, props.todolistId])

	return (
		<li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
			<Checkbox
				color={'primary'}
				onChange={onChangeStatus}
				checked={props.task.status === TaskStatuses.Completed}/>
			<ChangeTitleNameComponent
				changeTitleValue={props.task.title}
				onChange={onChangeTitle}
			/>
			<IconButton onClick={onClickHandler}>
				<Delete/>
			</IconButton>
		</li>)
})