import { Dispatch, SetStateAction, useState } from 'react'
import { getSettings, setSettings } from '../functions/settings'
import { Player } from '../types'
import { useForever } from './use-forever'

export function usePlayers() {
	const [state, setState] = useState(getSettings)

	const setPlayers: Dispatch<SetStateAction<Player[]>> = (valueOrFunction) => {
		setState(prev => {
			const value = valueOrFunction instanceof Function ? valueOrFunction(prev) : valueOrFunction

			setSettings(value)

			return value
		})
	}

	return [state, useForever(setPlayers)] as const
}
