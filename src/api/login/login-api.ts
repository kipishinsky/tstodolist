import axios from "axios";

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'e5aceb3f-c727-470c-862e-3ea92a474b0d'
	}
}
const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings
})

//api
export const loginApi = {

	createLogin(data: LoginParametersType) {
		return instance.post < ResponseLoginType <{userId?: number}>> (`auth/login`, data)
	},
	getStatusMe() {
		return instance.get < ResponseLoginType <{id: number, email: string, login: string }>> (`auth/me`)
	},
	deleteLogin () {
		return instance.delete < ResponseLoginType > (`auth/login`)
	}
}

//types

export type LoginParametersType = {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha?: string | boolean
}
export type ResponseLoginType<D={}> = {
	resultCode: number,
	messages: Array<string>,
	data: D
}