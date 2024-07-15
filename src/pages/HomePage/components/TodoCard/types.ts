import { ITodoInfoCustom } from 'app/store/pinia/todoInfo/types'

export interface ITodoCardProps {
	isLoader: boolean
	data?: ITodoInfoCustom
}
