import {instance} from '../../utilities/settings-query-api/setting-api'
import {LoginParametersType} from '../../utilities/types/login/login-types'
import {ResponseType} from '../../utilities/types/api/api-types'

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