export default {
	prefix: 'router',
	data: {
		base: {
			path: '/',
		},
		home: {
			name: 'HomePage',
			path: '/',
		},
		todo_detail: {
			name: 'TodoDetailPage',
			path: '/:slug?-:id(\\d+)?',
		},
		login: {
			name: 'LoginPage',
			path: '/login',
		},
		sign_up: {
			name: 'SignUpPage',
			path: '/sign-up',
		},
		not_found: {
			name: 'NotFoundPage',
			path: '/:pathMatch(.*)*',
		},
	},
}
