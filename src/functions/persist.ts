import { GameState } from '../types'

const PERSIST_KEY = 'state'

export function setPersistedState(state: Partial<GameState>) {
	localStorage.setItem(PERSIST_KEY, JSON.stringify(state))
}

export function getPersistedState() {
	const state = localStorage.getItem(PERSIST_KEY)

	return (state ? JSON.parse(state) : {}) as Partial<GameState>
}
