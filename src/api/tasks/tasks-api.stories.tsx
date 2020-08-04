import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {tasksAPI} from "./tasks-api";

export default {
	title: 'API'
}

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'b61c59bc-c21c-4a07-9ff4-5b299b2d5ced'
	}
}

export const GetTasks = () => {

	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<any>('')

	const getTasks = () => {
		tasksAPI.getTasks(todolistId).then ( (res) => {
			setState(res.data)
		})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} type="text" value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
			<button onClick={getTasks}>get tasks</button>
		</div>
	</div>

}



export const CreateTask = () => {

	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<any>('')
	const [newTitle, setNewTitle] = useState<any> ('')

	const createTask = () => {

		tasksAPI.createTask(todolistId, newTitle)
			.then ( (res) => {
				setState(res.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} type="text" value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
			<input placeholder={'create title'} type="text" value={newTitle} onChange={ (e) => {setNewTitle(e.currentTarget.value)}} />
			<button onClick={createTask}>create task</button>
		</div>
	</div>
}


export const DeleteTask = () => {

	const [state, setState] = useState<any>(null)
	const [taskId, setTaskId] = useState<any>('')
	const [todolistId, setTodolistId] = useState<any>('')

	const deleteTask = () => {

		tasksAPI.deleteTask(todolistId, taskId)
			.then ( (res) => {
				setState(res.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} type="text" value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
			<input placeholder={'taskId'} type="text" value={taskId} onChange={ (e) => {setTaskId(e.currentTarget.value)}}/>
			<button onClick={deleteTask}>delete task</button>
		</div>
	</div>
}


export const UpdateTaskTitle = () => {

	const [state, setState] = useState<any>(null)
	const [taskId, setTaskId] = useState<any>('')
	const [todolistId, setTodolistId] = useState<any>('')
	const [newTitle, setNewTitle] = useState<any> ('')

	const updateTitle = () => {

		tasksAPI.updateTaskTitle(todolistId, taskId, newTitle)
			.then ( (res) => {
				setState(res.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} type="text" value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
			<input placeholder={'taskId'} type="text"  value={taskId} onChange={ (e) => {setTaskId(e.currentTarget.value)}}/>
			<input placeholder={'new title'} type="text" value={newTitle} onChange={ (e) => {setNewTitle(e.currentTarget.value)}} />
			<button onClick={updateTitle}>update new title in task</button>
		</div>
	</div>
}
