import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {ChangeTitleNameComponent} from '../change-title-item/ChangeTitleNameComponent';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from "../../api/tasks/tasks-api";


type TasksPropsType = {
	task: TaskType
	todolistId: string
	changeTaskStatus: (tasksId: string, status: TaskStatuses, todoListsId: string) => void // меняет галку таски
	changeTaskTitle: (tasksId: string, tasksTitle: string, todoListsId: string) => void   // меняет название таски
	removeTask: (todoListsId: string, tasksId: string,) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает

	
}
export const Task = React.memo ((props: TasksPropsType) => {
	
	const onClickHandler = () => {
		/*debugger*/
		return props.removeTask(props.task.id, props.todolistId)
	} //при нажатии кнопки удаляется таска. ВАЖНО функция removeTask вызывается и туда залетают параметры с id и улетает назад в колбеке
	
	// меняет галку таски
	const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked;
		props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId);
	}
	// меняет название таски
	const onChangeTitle = useCallback ( (newItemValue: string) => {
		props.changeTaskTitle(props.task.id, newItemValue, props.todolistId);
	}, [props.changeTaskTitle, props.task.id, props.todolistId])
	
	return (
		<li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
			
			{/*подключенный checkbox из material ui*/}
			<Checkbox
				color={'primary'}
				onChange={onChangeStatus}
				checked={props.task.status === TaskStatuses.Completed}/> {/*состояние галки*/}
			<ChangeTitleNameComponent
				changeTitleValue={props.task.title}
				onChange={onChangeTitle}
			/>
			{/*добавили иконку удаления, с библиотеками
                                // with yarn
                                yarn add @material-ui/core
                                
                                // with yarn
                                yarn add @material-ui/icons
                                */}
			<IconButton onClick={onClickHandler}>
				<Delete/>
			</IconButton>
		</li>)
})