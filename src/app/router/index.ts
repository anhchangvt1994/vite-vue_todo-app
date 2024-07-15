import ErrorComponent from 'components/ErrorComponent.vue'
import PageLoader from 'components/PageLoader.vue'
import LazyRoute from 'utils/LazyRoute'
import { type RouteRecordRaw } from 'vue-router'
import BeforeEach from './utils/BeforeEachHandler'

const lazyPage = LazyRoute.init({
	suspensible: false,
	loadingComponent: PageLoader,
	errorComponent: ErrorComponent,
	delay: 100,
	onError(error, retry, fail) {
		fail()
	},
})

const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: import.meta.env.ROUTER_BASE_PATH,
		meta: {
			protect(certInfo) {
				const user = certInfo.user.value
				const to = certInfo.navigateInfo.to

				if (
					![
						import.meta.env.ROUTER_LOGIN_NAME,
						import.meta.env.ROUTER_SIGN_UP_NAME,
					].includes(to.name as string) &&
					(!user || !user.email)
				)
					return import.meta.env.ROUTER_LOGIN_PATH

				return true
			},
		},
		children: [
			{
				name: import.meta.env.ROUTER_HOME_NAME,
				path: import.meta.env.ROUTER_HOME_PATH,
				component: lazyPage(() => import('pages/HomePage/index.vue')),
				children: [
					{
						name: import.meta.env.ROUTER_TODO_DETAIL_NAME,
						path: import.meta.env.ROUTER_TODO_DETAIL_PATH,
						component: lazyPage(() => import('pages/TodoDetailPage/index.vue')),
					},
				],
			},
			{
				name: import.meta.env.ROUTER_LOGIN_NAME,
				path: import.meta.env.ROUTER_LOGIN_PATH,
				component: lazyPage(() => import('pages/LoginPage/index.vue')),
				meta: {
					protect(certInfo) {
						const user = certInfo?.user.value

						if (user && user.email) {
							switch (true) {
								case !!certInfo.successPath:
									return certInfo.successPath
								case !!certInfo.navigateInfo.from &&
									certInfo.navigateInfo.from.name !==
										import.meta.env.ROUTER_SIGN_UP_NAME:
									return certInfo.navigateInfo.from.fullPath
								default:
									return import.meta.env.ROUTER_HOME_PATH
							}
						}

						return true
					},
				},
			},
			{
				name: import.meta.env.ROUTER_SIGN_UP_NAME,
				path: import.meta.env.ROUTER_SIGN_UP_PATH,
				component: lazyPage(() => import('pages/SignUpPage/index.vue')),
				meta: {
					protect(certInfo) {
						const user = certInfo?.user.value

						if (user && user.email) {
							return (
								certInfo.successPath ||
								(certInfo.navigateInfo?.from?.fullPath ??
									import.meta.env.ROUTER_HOME_PATH)
							)
						}

						return true
					},
				},
			},
			{
				name: import.meta.env.ROUTER_NOT_FOUND_NAME,
				path: import.meta.env.ROUTER_NOT_FOUND_PATH,
				component: lazyPage(() => import('pages/NotFoundPage.vue')),
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	sensitive: true,
})

BeforeEach.init(router, {})

export default router
