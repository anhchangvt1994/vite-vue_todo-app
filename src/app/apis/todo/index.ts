import {
	QueryFunction,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/vue-query'
import {
	ICreateTodoPayload,
	IGetTodoListParams,
	ITodoInfo,
	IUpdateTodoPayload,
} from './types'
import { useTodoStore } from 'app/store/pinia/todoInfo'

const getTodoList: QueryFunction<ITodoInfo[], any[]> = async ({ queryKey }) => {
	const queryString = new URLSearchParams({
		...queryKey[1],
		_sort: 'id',
		_order: 'desc',
	}).toString()
	try {
		const response = await fetch(
			`${import.meta.env.API_BASE_URL}/api/todoList?${queryString}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			throw new Error('Get todo list failed')
		}

		const data = await response.json()
		const { setTodoList } = useTodoStore()
		setTodoList(data)
		return data
	} catch (err) {
		throw err
	}
} // getTodoList()

const getTodo: QueryFunction<ITodoInfo, any[]> = async ({ queryKey }) => {
	try {
		const response = await fetch(
			`${import.meta.env.API_BASE_URL}/api/todoList/${queryKey[1]}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			throw new Error('Get todo failed')
		}

		return response.json()
	} catch (err) {
		throw err
	}
} // getTodo()

const createTodo = async (payload: ICreateTodoPayload) => {
	try {
		const response = await fetch(
			`${import.meta.env.API_BASE_URL}/api/todoList`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}
		)

		if (!response.ok) {
			throw new Error('Create todo failed')
		}

		return response.json()
	} catch (err) {
		throw err
	}
} // createTodo()

const updateTodo = async ({ id, ...payload }: IUpdateTodoPayload) => {
	try {
		const response = await fetch(
			`${import.meta.env.API_BASE_URL}/api/todoList/${id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}
		)

		if (!response.ok) {
			throw new Error('Update todo failed')
		}

		return response.json()
	} catch (err) {
		throw err
	}
} // updateTodo()

const removeTodo = async (id: number) => {
	try {
		const response = await fetch(
			`${import.meta.env.API_BASE_URL}/api/todoList/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			throw new Error('Remove todo failed')
		}

		return response.json()
	} catch (err) {
		throw err
	}
} // removeTodo()

export const useQueryGetTodoList = (params: Ref<IGetTodoListParams>) => {
	return useQuery({
		queryKey: [import.meta.env.API_TODO_GET_TODO_LIST.key, params],
		queryFn: getTodoList,
		retry: 0,
	})
} // useQueryGetTodoList()

export const useQueryGetTodo = (id: number) => {
	return useQuery({
		queryKey: [import.meta.env.API_TODO_GET_TODO.key, id],
		queryFn: getTodo,
		gcTime: 0,
		retry: 0,
	})
} // useQueryGetTodo()

export const useMutationCreateTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [import.meta.env.API_TODO_GET_TODO_LIST.key],
			})
		},
		onError: (err) => {
			return err
		},
	})
} // useMutationCreateTodo()

export const useMutationUpdateTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [import.meta.env.API_TODO_GET_TODO_LIST.key],
			})
		},
		onError: (err) => {
			return err
		},
	})
} // useMutationUpdateTodo()

export const useMutationRemoveTodo = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: removeTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [import.meta.env.API_TODO_GET_TODO_LIST.key],
			})
		},
		onError: (err) => {
			return err
		},
	})
} // useMutationRemoveTodo()
