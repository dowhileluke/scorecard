import { Dispatch, SetStateAction, useState } from 'react'
import { getSettings, setSettings } from '../functions/settings'
import { Player, PlayerId } from '../types'
import { useForever } from './use-forever'

export function usePlayers() {
	const [players, setPlayers] = useState(getSettings)

	function addPlayer(name: string) {
		setPlayers(prev => {
			const id = 1 + prev.reduce((maxId, p) => p.id > maxId ? p.id : maxId, 0)

			return [...prev, { id, name }]
		})
	}

	function updatePlayer(id: PlayerId, name: string) {
		setPlayers(prev => prev.map(p => p.id === id ? { id, name } : p))
	}

	function deletePlayer(id: PlayerId) {
		setPlayers(prev => prev.filter(p => p.id !== id))
	}

	return {
		players,
		addPlayer,
		updatePlayer,
		deletePlayer,
	}
}
