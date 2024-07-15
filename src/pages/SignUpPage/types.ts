export interface ISignUpRequestParamsForForm {
	name: string
	email: string
	password: string
	confirmPassword: string
	date: number
	month: number
	year: number
	gender: string
}

export interface ISignUpRequestParams {
	name: string
	email: string
	password: string
	birthday: number
	gender: number
}
