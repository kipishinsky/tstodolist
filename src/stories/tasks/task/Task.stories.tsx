import React from 'react'
import {action} from '@storybook/addon-actions'
import {Task} from '../../../components/todolists-lists/todolist/task/Task'
import {TaskPriorities, TaskStatuses} from '../../../utilities/types/todolists/tasks/tasks-type'

export default {
	title: 'task',
	component: Task
}

const changeTaskStatusCallback = action('change Task status')
const changeTaskTitleCallback = action('change Task title')
const removeTaskCallback = action('Task remove')

export const TaskBaseExample = () => {
	return <>
		<Task
			task={{
				id: '1',
				status: TaskStatuses.Completed,
				title: 'CSS',
				todoListId: 'todolistId',
				priority: TaskPriorities.Low,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''
			}}
			changeTaskStatus={changeTaskStatusCallback}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			todolistId={'todolistId1'}
		/>
		<Task
			task={{
				id: '2',
				title: 'JS',
				status: TaskStatuses.New,
				todoListId: 'todolistId',
				priority: TaskPriorities.Middle,
				completed: false,
				description: '',
				startDate: '',
				deadline: '',
				order: 0,
				addedDate: ''
			}}
			changeTaskStatus={changeTaskStatusCallback}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			todolistId={'todolistId2'}
		/>
	</>
}