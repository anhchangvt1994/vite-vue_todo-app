<script setup lang="ts">
	import { useMutationUpdateTodo, useQueryGetTodo } from 'app/apis/todo'
	import { useTodoStore } from 'app/store/pinia/todoInfo'
	import { ITodoInfo } from 'app/store/pinia/todoInfo/types'
	import { useToastList } from 'components/ToastList/composable/useToastList'
	import { useForm } from 'vee-validate'
	import TodoDetailLoader from './components/TodoDetailLoader.vue'
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	import { faRefresh, faWarning } from '@fortawesome/free-solid-svg-icons'

	const schema = yup.object().shape({
		title: yup.string().required('Title is required'),
		description: yup.string().required('Description is required'),
		completed: yup.boolean().required('Complete is required'),
	})

	const route = useRoute()
	const router = useRouter()

	const { addToast } = useToastList()
	const { updateTodoInfo } = useTodoStore()
	const {
		data,
		isFetching: isFetchingGetTodo,
		isError: isErrorGetTodo,
		isSuccess: isSuccessGetTodo,
		refetch,
	} = useQueryGetTodo(Number(route.params.id))
	const { mutate, isPending, isError, isSuccess } = useMutationUpdateTodo()

	const { defineField, handleSubmit, errors, resetForm } = useForm({
		validationSchema: schema,
		initialValues: {
			title: '',
			description: '',
			completed: false,
		},
	})

	const close = () => {
		router.push({ path: import.meta.env.ROUTER_HOME_PATH })
	}

	const [title, titleAttrs] = defineField('title', {
		validateOnBlur: false,
	})

	const [description, descriptionAttrs] = defineField('description', {
		validateOnBlur: false,
	})

	const submit = handleSubmit((payload) => {
		if (
			payload.title !== data.value?.title ||
			payload.description !== data.value?.description
		) {
			mutate({
				id: Number(route.params.id),
				...payload,
			})
		}
	})

	watch(isSuccessGetTodo, (success) => {
		if (success) {
			resetForm({
				values: {
					title: data.value?.title ?? '',
					description: data.value?.description ?? '',
					completed: false,
				},
			})
		}
	})

	watch(isError, (error) => {
		if (error) {
			addToast({
				type: 'error',
				message: 'Update task fail. Please try again later',
			})
		}
	})

	watch(isSuccess, (success) => {
		if (success) {
			updateTodoInfo({
				...(data.value as ITodoInfo),
				isUpdating: true,
			})
			close()
		}
	})
</script>
<template>
	<TodoDetailLoader v-if="isFetchingGetTodo" />
	<div
		v-else
		class="absolute top-0 left-0 w-full h-[100vh] bg-gray-600 bg-opacity-50 cursor-pointer"
		@click="close"
	>
		<div
			class="absolute bg-white rounded-lg p-4 w-[320px] left-0 right-0 mx-auto translate-y-[-50%] top-[50%] overflow-hidden cursor-default"
			@click="(e) => e.stopPropagation()"
		>
			<div class="text-xl font-bold text-center">Task</div>
			<form @submit="submit">
				<label class="form-control w-full max-w-xs">
					<input
						name="title"
						type="text"
						placeholder="Title"
						:class="`border input input-bordered w-full max-w-xs mt-4 focus:outline-1 ${
							errors.title && 'input-error'
						}`"
						autoFocus
						autoComplete="false"
						v-model="title"
						v-bind="titleAttrs"
					/>
				</label>
				<label class="form-control mt-4">
					<textarea
						name="description"
						:class="`border textarea textarea-bordered h-24 resize-none focus:outline-1 ${
							errors.description && 'textarea-error'
						}`"
						placeholder="Description"
						v-model="description"
						v-bind="descriptionAttrs"
					/>
				</label>
				<button type="submit" class="btn btn-primary w-full mt-4">
					Create
				</button>
			</form>

			<div
				v-if="isErrorGetTodo"
				class="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold px-4"
			>
				<div class="bg-yellow-100 rounded-lg py-2 px-3 w-full text-yellow-800">
					<div class="flex items-center gap-3 justify-between">
						<div
							class="w-6 h-6 flex-none inline-flex justify-center items-center"
						>
							<FontAwesomeIcon :icon="faWarning" />
						</div>
						<div class="text-sm font-light">
							Fail to load todo detail info, please try again later.
						</div>
					</div>
					<div class="mt-1 flex justify-end">
						<button
							class="bg-yellow-800 border-none rounded-lg py-0 px-3 min-w-6 text-white hover:bg-yellow-900"
							@click="() => refetch()"
						>
							<FontAwesomeIcon :icon="faRefresh" />
						</button>
					</div>
				</div>
			</div>
			<div
				v-if="isPending"
				class="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold"
			>
				Updating
			</div>
		</div>
	</div>
</template>
