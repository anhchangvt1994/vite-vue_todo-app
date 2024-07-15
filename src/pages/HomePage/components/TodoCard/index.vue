<script setup lang="ts">
	import Card from './components/Card.vue'
	import Loader from './components/Loader.vue'

	const { isLoader, index } = defineProps<{
		isLoader: boolean
		index: number
	}>()
</script>

<template>
	<Loader v-if="isLoader" />
	<Card v-else :index="index" />
</template>
