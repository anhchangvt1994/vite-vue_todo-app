<script setup lang="ts">
	import { useMutationLogin, useQueryGetUser } from 'app/apis/user'
	import { useStorageStore } from 'app/store/pinia/storageInfo'
	import { useUserStore } from 'app/store/pinia/userInfo'
	import { useToastList } from 'components/ToastList/composable/useToastList'
	import ToastList from 'components/ToastList/index.vue'
	import { useForm } from 'vee-validate'
	import { EMAIL_VALIDATION_REGEX } from './constants'

	const { suspense } = useQueryGetUser()
	const { data: userInfo } = await suspense()
	const route = useRoute()

	if (userInfo?.id) {
		route.meta.reProtect?.()
	}

	const schema = yup.object({
		email: yup
			.string()
			.required('Email is required')
			.matches(EMAIL_VALIDATION_REGEX, 'Email is invalid'),
		password: yup.string().required('Password is required'),
	})

	const { addToast } = useToastList()

	const { handleSubmit, defineField, errors } = useForm<{
		email: string
		password: string
	}>({
		validationSchema: schema,
	})

	const [email, emailAttrs] = defineField('email', {
		validateOnBlur: false,
	})
	const [password, passwordAttrs] = defineField('password', {
		validateOnBlur: false,
	})

	const { mutate, isPending, isSuccess, isError } = useMutationLogin()

	const onSubmit = handleSubmit((requestParams) => {
		mutate(requestParams)
	})

	watch(isError, (error) => {
		if (error) {
			addToast({
				type: 'error',
				message: 'Login fail. Please try again later',
			})
		}
	})

	watch(isSuccess, (success) => {
		if (success) {
			const { userInfo } = useUserStore()
			const { setUserID } = useStorageStore()
			setUserID(userInfo.id)

			route.meta.reProtect?.()
		}
	})
</script>

<template>
	<div class="login-page">
		<section class="login-section">
			<div class="login-block">
				<form class="w-full p-4 rounded-xl border-[1px]" @submit="onSubmit">
					<div class="mb-4 text-xl w-full text-center font-bold">Sign In</div>
					<label class="form-control w-full max-w-xs">
						<input
							name="email"
							type="text"
							placeholder="Email or Phone number"
							:class="`input input-bordered w-full max-w-xs focus:outline-1 ${
								errors.email && 'input-error'
							}`"
							autoFocus
							v-model="email"
							v-bind="emailAttrs"
						/>
						<div :class="`label pt-[4px] ${!errors.email && 'invisible'}`">
							<span class="label-text-alt text-error">{{
								errors.email ? errors.email : 'Error Message'
							}}</span>
						</div>
					</label>
					<label class="form-control w-full max-w-xs">
						<input
							name="password"
							type="password"
							placeholder="Password"
							:class="`input input-bordered w-full max-w-xs focus:outline-1 ${
								errors.email && 'input-error'
							}`"
							v-model="password"
							v-bind="passwordAttrs"
						/>
						<div :class="`label pt-[4px] ${!errors.password && 'invisible'}`">
							<span class="label-text-alt text-error">{{
								errors.password ? errors.password : 'Error Message'
							}}</span>
						</div>
					</label>
					<button type="submit" class="btn btn-primary w-full">Login</button>
				</form>
				<div
					v-if="isPending"
					className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold"
				>
					Loading
				</div>
			</div>
		</section>
		<!-- .login-section -->
	</div>
	<!-- .login-page -->
	<ToastList />
</template>

<style lang="scss">
	.login-section {
		height: 100vh;
	}

	.login-block {
		position: relative;
		display: flex;
		max-width: 320px;
		flex-wrap: wrap;
		justify-content: center;
		left: 50%;
		top: 10%;
		transform: translate(-50%);
	}
</style>
