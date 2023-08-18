import { useState } from 'react'
import { Player, ModalState } from '../types'
import { useForever } from './use-forever'

const IDLE_STATE: ModalState = { mode: 'IDLE' }

export function useModalState() {
	const [state, setState] = useState(IDLE_STATE)

	const actions = useForever({
		addPlayer() {
			setState({ mode: 'ADD' })
		},
		editPlayer(player: Player) {
			setState({ mode: 'EDIT', player })
		},
		amendScore(player: Player, index: number) {
			setState({ mode: 'AMEND', player, index })
		},
		idle() {
			setState(IDLE_STATE)
		},
		config() {
			setState({ mode: 'CONFIG' })
		},
	})

	return [state, actions] as const
}
