import { FormState, Player } from '../types'

export function sumAndDelta(players: Player[], pending: FormState) {
	let sum = 0
	let delta = 0

	for (const { id } of players) {
		const score = pending[id] ?? 0

		sum += score
		delta += Math.abs(score)
	}

	return [sum, delta] as const
}
