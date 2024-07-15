<script setup lang="ts">
	import ToastCardWrapper from './components/ToastCard/Wrapper.vue'
	import { useToastList } from './composable/useToastList'
	const { toastList } = useToastList()
</script>

<template>
	<Teleport to="#toast">
		<div class="fixed bottom-0 right-0 w-full flex flex-col items-center">
			<ToastCardWrapper
				v-for="(item, index) in toastList"
				:key="`${index}_${item.type}_${Date.now()}`"
				:index="index"
				v-bind="item"
			/>
		</div>
	</Teleport>
</template>
