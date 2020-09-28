import React, {useState} from 'react'
import {DataType} from '../../utilities/types/login/login-types'

export default {
	title: 'login API'
}

export const Login = () => {
	//паль тип
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [rememberMe, setRememberMe] = useState<string>('')
	const [result, setResult] = useState<DataType>({
		email: 'No auth',
		password: 'No password',
		rememberMe: false
	})

	const createLogin = () => {
		setResult({
			email: email,
			password: password,
			rememberMe: rememberMe
		})
	}

	return <div> {JSON.stringify(result)}
		<div>
			<input
				placeholder={'login'}
				type="text" value={email}
				onChange={(e) => {setEmail(e.currentTarget.value)}}/>
			<input
				placeholder={'password'}
				type="password" value={password}
				onChange={(e) => {setPassword(e.currentTarget.value)}}/>
			<input
				type="checkbox"
				onChange={(e) => {setRememberMe(e.currentTarget.value)}}/>
			<button onClick={createLogin}>login</button>
		</div>
	</div>
}


/*export const Logout = () => {

}*/

