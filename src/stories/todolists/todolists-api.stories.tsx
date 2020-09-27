import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistsAPI} from "../../api/todolist/todolists-api";

export default {
	title: 'API'
}

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'e5aceb3f-c727-470c-862e-3ea92a474b0d'
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
	const [updateTitle, setUpdateTitle] = useState<any> ('')

	const newValueTitle = () => {
		todolistsAPI.updateTodolistsTitle(todolistId, updateTitle)
			.then ( (res) => {
				setState(res.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} type="text" value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
			<input placeholder={'new title'} type="text" value={updateTitle} onChange={ (e) => {setUpdateTitle(e.currentTarget.value)}} />
			<button onClick={newValueTitle}>update new title in task</button>
		</div>
	</div>
}
