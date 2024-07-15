export interface IToastInfo {
	type: 'success' | 'error' | 'warning'
	message: string
	ttl?: number
}
