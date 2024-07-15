export interface IGetTodoListParams {
	_limit: number
}

export interface ITodoInfo {
	id: number
	title: string
	description: string
	completed: boolean
}

export interface ICreateTodoPayload {
	title: string
	description: string
	completed: boolean
}

export interface IUpdateTodoPayload {
	id: number
	title: string
	description: string
	completed: boolean
}
