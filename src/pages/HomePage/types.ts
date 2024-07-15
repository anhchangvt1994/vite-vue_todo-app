export interface ITodoInfo {
	id: number
	title: string
	description: string
	completed: boolean
}

export interface ITodoInfoCustom extends ITodoInfo {
	isRemoving?: boolean
	isRemoved?: boolean
	isUpdating?: boolean
	isUpdated?: boolean
}
