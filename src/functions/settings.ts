import { AppSettings } from '../types'

const SETTINGS_KEY = 'settings'
const DEFAULT_SETTINGS: AppSettings = {
	p1: 'Player One',
	p2: 'Player Two has a much longer name, like super crazy long',
	isInverted: false,
}

export function getSettings() {
	const settings = localStorage.getItem(SETTINGS_KEY)

	if (!settings) return DEFAULT_SETTINGS

	return JSON.parse(settings) as AppSettings
}

export function setSettings(settings: AppSettings) {
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
