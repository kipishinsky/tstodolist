export type LoginParametersType = {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha?: string | boolean
}

export type DataType = {
	email: string,
	password: string,
	rememberMe: boolean | string,
	captcha?: string | boolean
}