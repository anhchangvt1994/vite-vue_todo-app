import { VueQueryPlugin } from '@tanstack/vue-query'
import router from 'app/router'
import store from 'app/store/pinia'
import 'assets/styles/tailwind.css'
import { createApp } from 'vue'

const App = (() => {
	const initVueApp = () => {
		import('App.vue').then(function (data) {
			if (!data || !data.default) return
			createApp(data.default)
				.use(VueQueryPlugin)
				.use(store)
				.use(router)
				.mount('#root')
		})
	} // initVueApp()

	return {
		init() {
			initVueApp()
		},
	}
})()
App.init()
