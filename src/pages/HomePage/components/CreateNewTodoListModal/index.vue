<script setup lang="ts">
	import { useMutationCreateTodo } from 'app/apis/todo'
	import { useTodoStore } from 'app/store/pinia/todoInfo'
	import { INIT_TODO_INFO } from 'app/store/pinia/todoInfo/constants'
	import { useToastList } from 'components/ToastList/composable/useToastList'
	import { useForm } from 'vee-validate'

	const schema = yup.object().shape({
		title: yup.string().required('Title is required'),
		description: yup.string().required('Description is required'),
		completed: yup.boolean().required('Complete is required'),
	})

	const { addToast } = useToastList()
	const { addTodoInfo } = useTodoStore()
	const { mutate, isPending, isError, isSuccess } = useMutationCreateTodo()

	const { defineField, handleSubmit, errors } = useForm({
		validationSchema: schema,
		initialValues: {
			title: '',
			description: '',
			completed: false,
		},
	})

	const isShow = defineModel()
	const close = () => {
		isShow.value = isPending.value || false
	}

	const [title, titleAttrs] = defineField('title', {
		validateOnBlur: false,
	})

	const [description, descriptionAttrs] = defineField('description', {
		validateOnBlur: false,
	})

	const submit = handleSubmit((payload) => {
		mutate(payload)
	})

	watch(isError, (error) => {
		if (error) {
			addToast({
				type: 'error',
				message: 'Create task fail. Please try again later',
			})
		}
	})

	watch(isSuccess, (success) => {
		if (success) {
			addTodoInfo(INIT_TODO_INFO, {
				addTo: 'begin',
			})
			close()
		}
	})
</script>

<template>
	<div
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
				v-if="isPending"
				class="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold"
			>
				Creating
			</div>
		</div>
	</div>
</template>
