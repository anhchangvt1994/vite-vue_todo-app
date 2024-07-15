import { useUserStore } from 'app/store/pinia/userInfo'
import { ICertCustomizationInfo } from './types'
import store from 'app/store/pinia'
import { storeToRefs } from 'pinia'

export default function useCertificateCustomizationInfo(): ICertCustomizationInfo {
	const userStore = useUserStore(store)
	const { userInfo } = storeToRefs(userStore)

	return {
		user: userInfo,
	}
}
