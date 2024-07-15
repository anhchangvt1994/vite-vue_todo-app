export interface IUserInfo {
	email: string
	name: string
	id: number
}

export interface ICertCustomizationInfo {
	user: Ref<IUserInfo>
}
