export const ROUTER_BASE_PATH = '/'
export const ROUTER_HOME_NAME = 'HomePage'
export const ROUTER_HOME_PATH = '/'
export const ROUTER_TODO_DETAIL_NAME = 'TodoDetailPage'
export const ROUTER_TODO_DETAIL_PATH = '/:slug?-:id(\\d+)?'
export const ROUTER_LOGIN_NAME = 'LoginPage'
export const ROUTER_LOGIN_PATH = '/login'
export const ROUTER_SIGN_UP_NAME = 'SignUpPage'
export const ROUTER_SIGN_UP_PATH = '/sign-up'
export const ROUTER_NOT_FOUND_NAME = 'NotFoundPage'
export const ROUTER_NOT_FOUND_PATH = '/:pathMatch(.*)*'
export const API_USER_LOGIN = { key: 'login' }
export const API_USER_GET = { key: 'getUser' }
export const API_TODO_GET_TODO_LIST = { key: 'getTodoList' }
export const API_TODO_GET_TODO = { key: 'getTodo' }
export const STORE_USER_INFO_NAME = 'user'
export const STORE_STORAGE_INFO_NAME = 'storage'
export const STORE_TODO_INFO_NAME = 'todo'
export const ENV_VARIABLE_EXPORTER_FOR_AUTO_IMPORT = {
	'@/config/env/ENV.js': [
		'ROUTER_BASE_PATH',
		'ROUTER_HOME_NAME',
		'ROUTER_HOME_PATH',
		'ROUTER_TODO_DETAIL_NAME',
		'ROUTER_TODO_DETAIL_PATH',
		'ROUTER_LOGIN_NAME',
		'ROUTER_LOGIN_PATH',
		'ROUTER_SIGN_UP_NAME',
		'ROUTER_SIGN_UP_PATH',
		'ROUTER_NOT_FOUND_NAME',
		'ROUTER_NOT_FOUND_PATH',
		'API_USER_LOGIN',
		'API_USER_GET',
		'API_TODO_GET_TODO_LIST',
		'API_TODO_GET_TODO',
		'STORE_USER_INFO_NAME',
		'STORE_STORAGE_INFO_NAME',
		'STORE_TODO_INFO_NAME',
	],
}
