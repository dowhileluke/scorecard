import { getSettings, setSettings as setLocalSettings } from '../functions/settings'
import { useForever } from './use-forever'
import { AppSettings } from '../types'
import { useDiffState } from './use-diff-state'

type SettingsDiff = Partial<AppSettings> | ((settings: AppSettings) => Partial<AppSettings>)

export function useSettings() {
	const [settings, setSettings] = useDiffState(getSettings)

	function setByDiff(diff: SettingsDiff) {
		setSettings(prev => {
			const updates = diff instanceof Function ? diff(prev) : diff
			const next = { ...prev, ...updates }

			setLocalSettings(next)

			return next
		})
	}

	return [settings, useForever(setByDiff)] as const
}
