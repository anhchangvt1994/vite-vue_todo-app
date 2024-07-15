export interface ILoginRequestParams {
	email: string
	password: string
}

export interface ISignUpRequestParams {
	name: string
	email: string
	password: string
	birthday: number
	gender: number
}

export interface IUserInfo {
	name: string
	email: string
	id: number
}
