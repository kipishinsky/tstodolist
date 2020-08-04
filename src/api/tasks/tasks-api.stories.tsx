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

	useEffect(() => {
		tasksAPI.getTasks('08bcf024-e196-435e-8ff4-0afce00d156e').then ( (res) => {
			setState(res.data)
		})

	}, [])

	return <div> {JSON.stringify(state)}</div>

}



export const CreateTask = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {
		tasksAPI.createTask('08bcf024-e196-435e-8ff4-0afce00d156e', 'bbbbbbbbbbbbbbbbbbbbbb')
			.then ( (res) => {
				setState(res.data)
			})

	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const DeleteTask = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {

		tasksAPI.deleteTask('08bcf024-e196-435e-8ff4-0afce00d156e', 'a50e0128-0e92-46b3-9886-4bc2bd9ee262')
			.then ( (res) => {
				setState(res.data)
			})

	}, [])

	return <div> {JSON.stringify(state)}</div>


}


export const UpdateTaskTitle = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {

		tasksAPI.updateTaskTitle('08bcf024-e196-435e-8ff4-0afce00d156e', 'a264ebf4-a02e-4a49-89c7-e35fbafa413e', 'saaaaaaaaaaaaaao')
			.then ( (res) => {
				setState(res.data)
			})

	}, [])

	return <div> {JSON.stringify(state)}</div>
}
