<script setup lang="ts">
	import { useUserStore } from 'app/store/pinia/userInfo'
	import { storeToRefs } from 'pinia'
	import { RouterLink } from 'vue-router'

	const route = useRoute()
	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)

	const { resetUserInfo } = useUserStore()

	const logout = () => {
		resetUserInfo()
		route.meta.reProtect?.()
	} // logout
</script>

<template>
	<header class="header">
		<button v-if="userInfo.id" class="btn" @click="logout">Logout</button>
		<template v-else>
			<RouterLink
				v-if="route.name !== ROUTER_SIGN_UP_NAME"
				class="btn btn-primary ml-2"
				:to="ROUTER_SIGN_UP_PATH"
			>
				Sign Up
			</RouterLink>
			<RouterLink
				v-if="route.name !== ROUTER_LOGIN_NAME"
				class="btn btn-primary ml-2"
				:to="ROUTER_LOGIN_PATH"
			>
				Sign In
			</RouterLink>
		</template>
	</header>
</template>

<style lang="scss">
	.header {
		text-align: right;
		padding: 16px;
	}
</style>
