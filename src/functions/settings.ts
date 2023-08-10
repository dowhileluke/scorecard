import { Player } from '../types'

const SETTINGS_KEY = 'settings'
const DEFAULT_PLAYERS: Player[] = [
	{ id: 1, name: 'Player 1' },
	{ id: 2, name: 'Player 2' },
	// { id: 2, name: 'Player 2 has a much longer name, like super crazy long' },
]

export function getSettings() {
	const settings = localStorage.getItem(SETTINGS_KEY)

	if (!settings) return DEFAULT_PLAYERS

	return JSON.parse(settings) as typeof DEFAULT_PLAYERS
}

export function setSettings(settings: Player[]) {
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
