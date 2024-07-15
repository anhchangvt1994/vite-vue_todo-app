<script setup lang="ts">
	import ToastList from 'components/ToastList/index.vue'
	import TodoList from './components/TodoList/index.vue'
	import CreateNewTodoListModal from './components/CreateNewTodoListModal/index.vue'
	import { RouterView } from 'vue-router'

	const isShow = ref(false)
	const openCreateNewTodoListModal = () => {
		isShow.value = true
	}
</script>

<template>
	<div class="home-page">
		<div class="flex">
			<button
				class="btn bg-green-600 border-green-600 text-white hover:bg-green-500 hover:border-green-500"
				@click="openCreateNewTodoListModal"
			>
				+ Create new task
			</button>
		</div>

		<TodoList class="mt-4" />
	</div>

	<Teleport to="#modal">
		<CreateNewTodoListModal v-model="isShow" v-if="isShow" />
	</Teleport>
	<ToastList />
</template>
