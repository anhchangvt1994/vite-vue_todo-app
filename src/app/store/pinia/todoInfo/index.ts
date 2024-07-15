import { defineStore } from 'pinia'
import { IAddTodoInfoOptionsParam, ITodoInfo, ITodoInfoCustom } from './types'
import { INIT_TODO_LIST } from './constants'

export const useTodoStore = defineStore(import.meta.env.STORE_TODO_INFO_NAME, {
	state: (): { limit: number; todoList: ITodoInfoCustom[] } => ({
		limit: 10,
		todoList: INIT_TODO_LIST,
	}),
	actions: {
		setTodoList(todoList: ITodoInfo[]) {
			if (!todoList || !todoList.length) return
			let j = 0
			const newTodoList: ITodoInfoCustom[] = []
			for (const item of todoList) {
				if (this.todoList[j].id === item.id) {
					newTodoList.push({
						...this.todoList[j],
						...item,
						isUpdating: false,
						isUpdated: false,
					})
				} else {
					newTodoList.push(item)

					if (this.todoList[j].isRemoved) j++
				}
				j++
			}
			this.todoList = newTodoList
		},
		addTodoInfo(
			todoInfo: ITodoInfo,
			options: IAddTodoInfoOptionsParam = { addTo: 'end' }
		) {
			if (!todoInfo) return
			if (options.addTo === 'begin') {
				this.todoList = [todoInfo, ...this.todoList]
			} else if (options.addTo === 'end') {
				this.todoList = [...this.todoList, todoInfo]
			}
		},
		updateTodoInfo(todoInfo: ITodoInfoCustom) {
			if (!todoInfo) return
			this.todoList = this.todoList.map((item) => {
				if (item.id === todoInfo.id) return reactive(todoInfo)
				return item
			})
		},
		validTodoStatus() {
			for (const i in this.todoList) {
				if (this.todoList[i].isUpdating) {
					this.todoList[i].isUpdating = false
					this.todoList[i].isUpdated = true
				}
			}
		},
		updateLimit(limit: number) {
			this.limit = limit
		},
	},
})
