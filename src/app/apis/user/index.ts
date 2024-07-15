import { useMutation, useQuery } from '@tanstack/vue-query'
import { useStorageStore } from 'app/store/pinia/storageInfo'
import { useUserStore } from 'app/store/pinia/userInfo'
import { ILoginRequestParams, ISignUpRequestParams, IUserInfo } from './types'

const login = async (payload: ILoginRequestParams) => {
	try {
		const response = await fetch(`${import.meta.env.API_BASE_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		if (!response.ok) {
			throw new Error('Login failed')
		}

		return response.json()
	} catch (err) {
		throw err
	}
} // login()

const signUp = async (payload: ISignUpRequestParams) => {
	try {
		const response = await fetch(`${import.meta.env.API_BASE_URL}/api/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		if (!response.ok) {
			throw new Error('Sign-up failed')
		}

		return response.json()
	} catch (err) {
		throw err
	}
} // signUp()

const getUser = async (): Promise<IUserInfo> => {
	const { userInfo } = useUserStore()
	if (userInfo.id) return userInfo

	const { userID } = useStorageStore()
	if (!userID) return userInfo

	try {
		const response = await fetch(
			`${import.meta.env.API_BASE_URL}/api/users/${userID}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			throw new Error('Get user failed')
		}

		const { updateUserInfo } = useUserStore()

		const data = await response.json()
		updateUserInfo(data)
		return data
	} catch (err) {
		return userInfo
		// throw err
	}
} // getUser

export function useMutationLogin() {
	const { updateUserInfo } = useUserStore()

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			updateUserInfo(data)
			return data
		},
		onError: (err) => {
			return err
		},
	})
} // useMutationLogin

export function useMutationSignUp() {
	const { updateUserInfo } = useUserStore()

	return useMutation({
		mutationFn: signUp,
		onSuccess: (data) => {
			updateUserInfo(data)
			return data
		},
		onError: (err) => {
			return err
		},
	})
} // useMutationSignUp

export function useQueryGetUser() {
	return useQuery({
		queryKey: [import.meta.env.API_USER_GET.key],
		queryFn: getUser,
		staleTime: 0,
	})
} // useQueryGetUser
