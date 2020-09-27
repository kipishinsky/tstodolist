import {instance} from '../../common/setting-api'
import {LoginParametersType, ResponseType} from '../../common/types'

export const loginApi = {
	login(data: LoginParametersType) {
		return instance.post <ResponseType<{ userId?: number }>>(`auth/login`, data)
	},
	getStatusMe() {
		return instance.get <ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
	},
	logOut() {
		return instance.delete <ResponseType>(`auth/login`)
	}
}