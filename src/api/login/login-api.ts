import axios from 'axios'

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'b61c59bc-c21c-4a07-9ff4-5b299b2d5ced'
	}
}
const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings
})

//api
export const loginApi = {

	createLogin(data: LoginParametersType) {
		return instance.post <ResponseLoginType<{ userId?: number }>>(`auth/login`, data)
	},
	getStatusMe() {
		return instance.get <ResponseLoginType<{ id: number, email: string, login: string }>>(`auth/me`)
	},
	deleteLogin() {
		return instance.delete <ResponseLoginType>(`auth/login`)
	}
}

//types

export type LoginParametersType = {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha?: string | boolean
}
export type ResponseLoginType<D = {}> = {
	resultCode: number,
	messages: Array<string>,
	data: D
}