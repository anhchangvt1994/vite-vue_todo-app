export default {
	prefix: 'api',
	data: {
		base_url: 'http://localhost:3000',
		user: {
			login: {
				key: 'login',
			},
			get: {
				key: 'getUser',
			},
		},
		todo: {
			get_todo_list: {
				key: 'getTodoList',
			},
			get_todo: {
				key: 'getTodo',
			},
		},
	},
}
