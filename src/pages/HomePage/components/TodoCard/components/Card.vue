<script setup lang="ts">
	import { faBan, faFilePen } from '@fortawesome/free-solid-svg-icons'
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	import { useMutationRemoveTodo } from 'app/apis/todo'
	import { useTodoStore } from 'app/store/pinia/todoInfo'
	import { INIT_TODO_INFO } from 'app/store/pinia/todoInfo/constants'
	import { useToastList } from 'components/ToastList/composable/useToastList'
	import { RouterLink } from 'vue-router'

	const { addToast } = useToastList()
	const { mutate, isError, isSuccess } = useMutationRemoveTodo()
	const { index } = defineProps<{ index: number }>()
	const { todoList, addTodoInfo } = useTodoStore()
	const todo = todoList[index]

	const remove = () => {
		todo.isRemoving = true
		mutate(todo.id)
	} // remove

	watch(isError, (error) => {
		if (error) {
			todo.isRemoving = false
			addToast({
				type: 'error',
				message: 'Remove fail. Please try again later',
			})
		}
	})

	watch(isSuccess, (success) => {
		if (success) {
			todo.isRemoving = false
			todo.isRemoved = true
			addTodoInfo(INIT_TODO_INFO)
		}
	})
</script>
<template>
	<RouterLink
		:to="
			todo.isRemoved || todo.isUpdated || todo.isRemoving || todo.isUpdating
				? ''
				: `/${getSlug(todo.title)}-${todo.id}`
		"
		class="border rounded-lg border-gray-300 relative overflow-hidden"
	>
		<div class="flex gap-2 border-b border-b-gray-300 py-2 px-3">
			<div class="text-ellipsis font-bold overflow-hidden w-full">
				{{ todo.title }}
			</div>
			<div class="flex gap-2 items-center">
				<button
					@click="
						(e) => {
							e.preventDefault()
							remove()
						}
					"
					class="bg-red-300 h-4 w-4 rounded-full cursor-pointer"
				/>
			</div>
		</div>
		<div class="py-2 px-3">
			<p class="line-clamp-3">{{ todo.description }}</p>
		</div>
		<div
			v-if="
				todo.isRemoving || todo.isRemoved || todo.isUpdating || todo.isUpdated
			"
			class="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-85 text-xxl font-bold"
		>
			<template v-if="todo.isUpdating"> Updating </template>
			<template v-if="todo.isRemoving"> Removing </template>

			<FontAwesomeIcon
				v-if="todo.isUpdated"
				:icon="faFilePen"
				class="text-green-600 text-3xl"
			/>
			<FontAwesomeIcon
				v-if="todo.isRemoved"
				:icon="faBan"
				class="text-red-500 text-3xl"
			/>
		</div>
	</RouterLink>
</template>
