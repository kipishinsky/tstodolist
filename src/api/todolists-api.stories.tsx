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

	useEffect(() => {

		todolistsAPI.getTodolists().then ( (res) => {
			setState(res.data)
		})

	}, [])

	return <div> {JSON.stringify(state)}</div>

}



export const CreateTodolist = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {
		todolistsAPI.createTodolists('nyyyyaaaakuy')
			.then ( (res) => {
				setState(res.data)
			})

	}, [])

	return <div> {JSON.stringify(state)}</div>
}



export const DeleteTodolist = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {

		todolistsAPI.deleteTodolists('d4dbcaaf-f317-4207-ba3b-7138f44cd06d')
			.then ( (res) => {
				setState(res.data)
			})

	}, [])

	return <div> {JSON.stringify(state)}</div>


}



export const UpdateTodolistTitle = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {

	todolistsAPI.updateTodolistsTitle('a4373257-ef40-47ee-80d2-72c2287b4851', 'new title run')
			.then ( (res) => {
				setState(res.data)
			})

	}, [])

	return <div> {JSON.stringify(state)}</div>
}
