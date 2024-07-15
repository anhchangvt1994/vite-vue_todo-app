<script setup lang="ts">
	import { faWarning } from '@fortawesome/free-solid-svg-icons'
	import { useQueryGetTodoList } from 'app/apis/todo'
	import { useTodoStore } from 'app/store/pinia/todoInfo'
	import { storeToRefs } from 'pinia'
	import TodoCard from '../TodoCard/index.vue'
	import Error from './components/Error.vue'

	const todoStore = useTodoStore()
	const { validTodoStatus } = todoStore
	const { todoList, limit } = storeToRefs(todoStore)
	const queryParams = ref({ _limit: limit.value })
	const { data, isFetching, isError, refetch } =
		useQueryGetTodoList(queryParams)
	const isForceToShowLoader = computed(() => isFetching.value && isError.value)

	watch(isError, (error) => {
		if (error) {
			validTodoStatus()
		}
	})
</script>

<template>
	<div
		v-if="isFetching || data"
		:class="`grid grid-cols-4 gap-4 ${$attrs.class}`"
	>
		<TodoCard
			v-for="(todo, i) in todoList"
			:key="`${todo.id}_${todo.isUpdating}`"
			:isLoader="isForceToShowLoader || Number.isNaN(todo.id)"
			:index="i"
		/>
	</div>
	<template v-if="isError">
		<div v-if="data" class="flex justify-center">
			<div
				class="bg-yellow-100 border border-yellow-400 rounded-lg py-2 px-3 text-yellow-800 mt-4"
			>
				<div class="flex items-center gap-2 justify-between">
					<div
						class="w-6 h-6 flex-none inline-flex justify-center items-center text-xl"
					>
						<FontAwesomeIcon :icon="faWarning" />
					</div>
					<div class="text-lg font-light">
						Fail to refetch the newest Todo list, please try
						<span
							@click="() => refetch()"
							class="underline cursor-pointer font-medium"
						>
							refetch
						</span>
						it by manually.
					</div>
				</div>
			</div>
		</div>
		<Error v-else class="mt-4" @refetch="refetch" />
	</template>
	<RouterView />
</template>
