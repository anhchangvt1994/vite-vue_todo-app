import { defineStore } from 'pinia'
import { IUserInfo } from './types'
import { INIT_USER_INFO } from './constants'
import { useStorageStore } from '../storageInfo'

export const useUserStore = defineStore(import.meta.env.STORE_USER_INFO_NAME, {
	state: (): { userInfo: IUserInfo } => ({
		userInfo: INIT_USER_INFO,
	}),
	actions: {
		updateUserInfo(userInfo: IUserInfo) {
			this.userInfo = userInfo
		},
		resetUserInfo() {
			const { setUserID } = useStorageStore()
			setUserID(0)
			this.userInfo = INIT_USER_INFO
		},
	},
})
