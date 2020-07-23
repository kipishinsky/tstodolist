import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {ChangeTitleNameComponent} from './ChangeTitleNameComponent';
import {Delete} from '@material-ui/icons';
import {TasksType} from './Todolist';

type TasksPropsType = {
	changeTaskStatus: (tasksId: string, tasksIsDone: boolean, todoListsId: string) => void // меняет галку таски
	changeTaskTitle: (tasksId: string, tasksTitle: string, todoListsId: string) => void   // меняет название таски
	removeTask: (todoListsId: string, tasksId: string,) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает
	task: TasksType
	todolistId: string
	
}
export const Task = React.memo ((props: TasksPropsType) => {
	
	const onClickHandler = () => {
		/*debugger*/
		return props.removeTask(props.task.taskId, props.todolistId)
	} //при нажатии кнопки удаляется таска. ВАЖНО функция removeTask вызывается и туда залетают параметры с id и улетает назад в колбеке
	
	// меняет галку таски
	const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked;
		props.changeTaskStatus(props.task.taskId, newIsDoneValue, props.todolistId);
	}
	// меняет название таски
	const onChangeTitle = useCallback ( (newItemValue: string) => {
		props.changeTaskTitle(props.task.taskId, newItemValue, props.todolistId);
	}, [props.changeTaskTitle, props.task.taskId, props.todolistId])
	
	return (
		<li key={props.task.taskId} className={props.task.taskIsDone ? 'is-done' : ''}>
			
			{/*подключенный checkbox из material ui*/}
			<Checkbox
				color={'primary'}
				onChange={onChangeStatus}
				checked={props.task.taskIsDone}/> {/*состояние галки*/}
			<ChangeTitleNameComponent
				changeTitleValue={props.task.taskTitle}
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