import { defineStore } from 'pinia'
import { initialStorageInfo } from './constants'

export const useStorageStore = defineStore(
	import.meta.env.STORE_STORAGE_INFO_NAME,
	{
		state: () => initialStorageInfo,
		actions: {
			setUserID(id: number) {
				this.userID = id
				localStorage.setItem('userID', String(id))
			},
			removeUserID() {
				this.userID = 0
				localStorage.removeItem('userID')
			},
		},
	}
)
