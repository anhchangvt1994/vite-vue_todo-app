import { LIMIT } from '../constants'
import { IToastInfo } from '../types'

export const useToastList = (() => {
	const toastList = ref<IToastInfo[]>([])
	return () => {
		const setToastList = (list: IToastInfo[]) => {
			if (!list || !list.length) return
			if (list.length > LIMIT) list.slice(list.length - 1, 1)
			toastList.value = list
		} // setToastList

		const addToast = (toast: IToastInfo) => {
			if (!toast) return
			if (toastList.value.length >= LIMIT) {
				toastList.value.splice(0, 1)
			}

			toastList.value = [toast, ...toastList.value]
		} // addToast

		const removeToast = (index: number) => {
			if (!toastList.value[index]) return
			toastList.value.splice(index, 1)
		} // removeToast

		return {
			toastList,
			setToastList,
			addToast,
			removeToast,
		}
	}
})()
