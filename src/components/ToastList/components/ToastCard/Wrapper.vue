<script setup lang="ts">
	import { useToastList } from 'components/ToastList/composable/useToastList'
	import { IToastInfo } from 'components/ToastList/types'
	import Error from './Error.vue'
	import Success from './Success.vue'
	import Warning from './Warning.vue'

	const props = defineProps<IToastInfo & { index: number }>()
	const { removeToast } = useToastList()
	const removeTimeout = setTimeout(() => {
		removeToast(props.index)
	}, 2000)
	onBeforeUnmount(() => {
		clearTimeout(removeTimeout)
	})
</script>

<template>
	<Success
		v-if="props.type === 'success'"
		v-bind="props"
		@remove="() => removeToast(props.index)"
	/>
	<Warning
		v-if="props.type === 'warning'"
		v-bind="props"
		@remove="() => removeToast(props.index)"
	/>
	<Error
		v-if="props.type === 'error'"
		v-bind="props"
		@remove="() => removeToast(props.index)"
	/>
</template>
