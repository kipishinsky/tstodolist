import React, {useEffect, useState} from 'react'
import axios from 'axios'

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
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке

		axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
			.then ( (res) => {
			debugger
			setState(res.data)
		})


	}, [])

	return <div> {JSON.stringify(state)}</div>

}



export const CreateTodolist = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке

		axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: 'pognali'}, settings)
			.then ( (res) => {
				debugger
				setState(res.data)
			})

	}, [])

	return <div> {JSON.stringify(state)}</div>


} // https://github.com/streamich/react-use



export const DeleteTodolist = () => {

	const [state, setState] = useState<any>(null)

	useEffect(() => {
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке
		axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/88bc71ba-5d23-40fd-9e2d-9d495c2ee0e7", settings)
			.then ( (res) => {
				debugger
				setState(res.data)
			})


	}, [])

	return <div> {JSON.stringify(state)}</div>


}



export const UpdateTodolistTitle = () => {

	const [state, setState] = useState<any>(null)


	useEffect(() => {
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке

		axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/901db4ed-bc2b-4702-978b-89e9e8b6904d", {title: 'priehali'}, settings)
			.then ( (res) => {
				debugger
				setState(res.data)
			})

	}, [])


	return <div> {JSON.stringify(state)}</div>

}
