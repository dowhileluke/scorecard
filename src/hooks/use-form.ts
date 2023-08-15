import { useEffect, useState } from 'react'
import { FormState, Player, PlayerId } from '../types'
import { useForever } from './use-forever'

const INIT_STATE: FormState = {}

export function useForm(players: Player[]) {
	const [state, setState] = useState(INIT_STATE)

	useEffect(() => {
		setState(prev => {
			const result: FormState = {}

			for (const { id } of players) {
				const existing = prev[id]

				if (typeof existing !== 'undefined') {
					result[id] = existing
				}
			}

			return result
		})
	}, [players])

	function setFormValue(id: PlayerId, points: number | null) {
		setState(prev => ({
			...prev,
			[id]: points,
		}))
	}

	function resetForm() {
		setState(INIT_STATE)
	}

	return [state, useForever(setFormValue), useForever(resetForm)] as const
}
