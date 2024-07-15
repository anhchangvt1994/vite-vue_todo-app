<script setup lang="ts">
	import { useMutationSignUp } from 'app/apis/user'
	import { useStorageStore } from 'app/store/pinia/storageInfo'
	import { useUserStore } from 'app/store/pinia/userInfo'
	import { useToastList } from 'components/ToastList/composable/useToastList'
	import ToastList from 'components/ToastList/index.vue'
	import { useForm } from 'vee-validate'
	import { EMAIL_VALIDATION_REGEX, NAME_VALIDATION_REGEX } from './constants'
	import { ISignUpRequestParams, ISignUpRequestParamsForForm } from './types'

	const route = useRoute()

	const schema = yup.object().shape({
		email: yup
			.string()
			.required('Email is required')
			.matches(EMAIL_VALIDATION_REGEX, 'Email is invalid'),
		name: yup
			.string()
			.required('Name is required')
			.matches(NAME_VALIDATION_REGEX, 'Name is invalid'),
		password: yup.string().required('Password is required'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), undefined], 'Password must match'),
		date: yup.number().required(),
		month: yup.number().required(),
		year: yup.number().required(),
		gender: yup.string().required('Gender is required'),
	})

	const { mutate, isPending, isSuccess, isError } = useMutationSignUp()
	const { addToast } = useToastList()

	const { defineField, handleSubmit, errors } =
		useForm<ISignUpRequestParamsForForm>({
			validationSchema: schema,
			initialValues: {
				gender: '1',
				date: 1,
				month: 1,
				year: new Date().getFullYear(),
				password: '',
				confirmPassword: '',
			},
		})

	const [email, emailAttrs] = defineField('email', {
		validateOnBlur: false,
	})
	const [name, nameAttrs] = defineField('name', {
		validateOnBlur: false,
	})
	const [password, passwordAttrs] = defineField('password', {
		validateOnBlur: false,
	})
	const [confirmPassword, confirmPasswordAttrs] = defineField(
		'confirmPassword',
		{
			validateOnBlur: false,
		}
	)
	const [date, dateAttrs] = defineField('date', {
		validateOnBlur: false,
	})
	const [month, monthAttrs] = defineField('month', {
		validateOnBlur: false,
	})
	const [year, yearAttrs] = defineField('year', {
		validateOnBlur: false,
	})

	const startMonth = 1
	const totalMonths = 12
	const startYear = 1992
	const currentYear = new Date().getFullYear()
	const totalYears = currentYear - startYear
	const totalDates = computed(() =>
		new Date(month.value || startMonth, year.value || startYear, 0).getDate()
	)

	const [gender, genderAttrs] = defineField('gender', {
		validateOnBlur: false,
	})

	const submit = handleSubmit((requestParams) => {
		const requestParamsFormatted: ISignUpRequestParams = {
			name: requestParams.name,
			password: requestParams.password,
			email: requestParams.email as string,
			gender: Number(requestParams.gender),
			birthday: new Date(
				`${requestParams.month}/${requestParams.date}/${requestParams.year}`
			).getTime(),
		}

		mutate(requestParamsFormatted)
	})

	watch(isError, (error) => {
		if (error) {
			addToast({
				type: 'error',
				message: 'Sign-up fail. Please try again later',
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

	const passwordLevel = ref<number>(0)
	watch(
		password,
		(() => {
			let timeout
			return (val) => {
				if (errors.value.password) {
					if (passwordLevel.value > 0) passwordLevel.value
					return
				}

				if (timeout) clearTimeout(timeout)

				timeout = setTimeout(() => {
					let tmpLevel = 0
					if (/[a-z]/g.test(val)) tmpLevel++
					if (/[A-Z]/g.test(val)) tmpLevel++
					if (/\d/g.test(val)) tmpLevel++
					if (/[!@#$%^&*(),.?":{}|<>]/g.test(val)) tmpLevel++

					passwordLevel.value = tmpLevel
				}, 150)
			}
		})()
	)
</script>

<template>
	<div class="sign-up-page">
		<section class="sign-up-section">
			<div class="sign-up-block">
				<form className="w-full p-4 rounded-xl border-[1px]" @submit="submit">
					<div className="mb-4 text-xl w-full text-center font-bold">
						Sign Up
					</div>

					<label className="form-control w-full max-w-xs">
						<input
							name="name"
							type="text"
							placeholder="Full name"
							:class="`input input-bordered w-full max-w-xs focus:outline-1 ${
								errors.name && 'input-error'
							}`"
							autoFocus
							autoComplete="false"
							v-bind="nameAttrs"
							v-model="name"
						/>
						<div class="label pt-[4px]">
							<span className="label-text-alt text-xs text-gray-500">
								The full name must have 2 to 40 characters, only accept
								alphabets
							</span>
						</div>
					</label>
					<!-- name -->

					<label className="form-control w-full max-w-xs">
						<input
							name="email"
							type="text"
							placeholder="Email"
							:class="`input input-bordered w-full max-w-xs focus:outline-1 ${
								errors.email && 'input-error'
							}`"
							autoComplete="false"
							v-bind="emailAttrs"
							v-model="email"
						/>
						<div class="label pt-[4px]">
							<span className="label-text-alt text-xs text-gray-500">
								The email must have just only one [ @ ] and [ . ] symbols
							</span>
						</div>
					</label>
					<!-- email -->

					<label className="form-control w-full max-w-xs">
						<input
							name="password"
							type="password"
							placeholder="Password"
							:class="`input input-bordered w-full max-w-xs focus:outline-1 ${
								errors.password && 'input-error'
							}`"
							v-bind="passwordAttrs"
							v-model="password"
						/>
						<div className="flex py-2 pl-1">
							<div
								:class="`w-[25px] h-[10px] border-[1px] border-gray-300 ${
									passwordLevel >= 1 && 'bg-primary border-primary'
								}`"
							/>
							<div
								:class="`w-[25px] h-[10px] border-[1px] border-gray-300 ml-1 ${
									passwordLevel >= 2 && 'bg-primary border-primary'
								}`"
							/>
							<div
								:class="`w-[25px] h-[10px] border-[1px] border-gray-300 ml-1 ${
									passwordLevel >= 3 && 'bg-primary border-primary'
								}`"
							/>
						</div>
					</label>
					<!-- password -->

					<label className="form-control w-full max-w-xs">
						<input
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							:class="`input input-bordered w-full max-w-xs focus:outline-1 ${
								errors.confirmPassword && 'input-error'
							}`"
							v-bind="confirmPasswordAttrs"
							v-model="confirmPassword"
						/>
						<div class="label py-[4px]">
							<span className="label-text-alt text-error"> </span>
						</div>
					</label>
					<!-- confirm password -->

					<div className="flex gap-2">
						<label class="form-control">
							<select
								class="select select-bordered"
								v-bind="dateAttrs"
								v-model="date"
							>
								<option disabled selected>Date</option>
								<option v-for="val in totalDates" :key="val" :value="val">
									{{ val }}
								</option>
							</select>
						</label>
						<label class="form-control">
							<select
								class="select select-bordered w-full"
								v-bind="monthAttrs"
								v-model="month"
							>
								<option disabled selected>Month</option>
								<option v-for="val in totalMonths" :key="val" :value="val">
									{{ val }}
								</option>
							</select>
						</label>
						<label class="form-control">
							<select
								class="select select-bordered"
								v-bind="yearAttrs"
								v-model="year"
							>
								<option disabled selected>Year</option>
								<option :value="startYear">{{ startYear }}</option>
								<option
									v-for="val in totalYears"
									:key="val"
									:value="startYear + val"
								>
									{{ startYear + val }}
								</option>
							</select>
						</label>
					</div>
					<!-- birthday -->

					<div className="flex mt-4">
						<label className="inline-flex items-center">
							<input
								type="radio"
								className="radio radio-primary"
								value="1"
								v-bind="genderAttrs"
								v-model="gender"
							/>
							<span className="ml-2">Male</span>
						</label>
						<label className="inline-flex items-center ml-3">
							<input
								type="radio"
								className="radio radio-primary"
								value="2"
								v-bind="genderAttrs"
								v-model="gender"
							/>
							<span className="ml-2">Female</span>
						</label>
					</div>
					<!-- gender -->

					<button type="submit" className="btn btn-primary w-full mt-4">
						Register
					</button>
				</form>

				<div
					v-if="isPending"
					className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold"
				>
					Loading
				</div>
			</div>
		</section>
	</div>
	<ToastList />
</template>

<style lang="scss">
	.sign-up-section {
		height: 100vh;
	}

	.sign-up-block {
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
