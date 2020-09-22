import React, { useState} from 'react'
import {loginApi} from "./login-api";

export default {
	title: 'API'
}

/*
export const CreateTask = () => {

	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<any>('')
	const [newTitle, setNewTitle] = useState<any> ('')

	const createTask = () => {

		loginApi.createTask(todolistId, newTitle)
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

		loginApi.deleteTask(todolistId, taskId)
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
*/
