import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistsAPI} from "./todolists-api";

export default {
	title: 'API'
}

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'b61c59bc-c21c-4a07-9ff4-5b299b2d5ced'
	}
}

export const GetTodolists = () => {

	const [state, setState] = useState<any>(null)

	const getTodolists = () => {
		todolistsAPI.getTodolists().then ( (res) => {
			setState(res.data)
		})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<button onClick={getTodolists}>get todolists</button>
		</div>
	</div>

}



export const CreateTodolist = () => {

	const [state, setState] = useState<any>(null)
	const [newTitleTodolist, setTitleTodolist] = useState<any> ('')

	const newTitle = () => {
		todolistsAPI.createTodolists( newTitleTodolist)
			.then ( (res) => {
				setState(res.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'new title'} type="text" value={newTitleTodolist} onChange={ (e) => {setTitleTodolist(e.currentTarget.value)}} />
			<button onClick={newTitle}>create todolist</button>
		</div>
	</div>
}



export const DeleteTodolist = () => {

	const [state, setState] = useState<any>(null)
	const [deleteTodolist, setDeleteTodolist] = useState<any>('')


	const deleteTodo = () => {
		todolistsAPI.deleteTodolists(deleteTodolist)
			.then ( (res) => {
				setState(res.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} type="text" value={deleteTodolist} onChange={ (e) => {setDeleteTodolist(e.currentTarget.value)}}/>
			<button onClick={deleteTodo}>delete todolist</button>
		</div>
	</div>


}



export const UpdateTodolistTitle = () => {

	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<any>('')
	const [newTitle, setNewTitle] = useState<any> ('')

	const updateTitle = () => {
		todolistsAPI.updateTodolistsTitle(todolistId, newTitle)
			.then ( (res) => {
				setState(res.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} type="text" value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
			<input placeholder={'new title'} type="text" value={newTitle} onChange={ (e) => {setNewTitle(e.currentTarget.value)}} />
			<button onClick={updateTitle}>update new title in task</button>
		</div>
	</div>
}
