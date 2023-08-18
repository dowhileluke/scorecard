import { useEffect, useRef } from 'react'
import { FormState, GameState, Player, PlayerId, ScoreState } from '../types'
import { getPersistedState, setPersistedState } from '../functions/persist'
import { useForever } from './use-forever'
import { useCollection } from './use-collection'
import { mutateAtIndex } from '../functions/array'

const PERSISTED_STATE = getPersistedState()
const DEFAULT_PLAYERS: Player[] = [
		{ id: 1, name: 'Player 1' },
		{ id: 2, name: 'Player 2' },
]

function getInitialScores({ players = DEFAULT_PLAYERS, scores }: Partial<GameState>) {
	const result: ScoreState = {}

	for (const { id } of players) {
		result[id] = scores?.[id] ?? []
	}

	return result
}

const INITIAL_STATE: GameState = {
	players: DEFAULT_PLAYERS,
	config: { submitNulls: true, persistScores: true },
	...PERSISTED_STATE,
	scores: getInitialScores(PERSISTED_STATE),
}
const EMPTY_SCORES: ScoreState = {}

export function useGameState() {
	const isDirtyRef = useRef(false)
	const [state, set, setState] = useCollection(INITIAL_STATE)
	const scores = state.config.persistScores ? state.scores : EMPTY_SCORES

	useEffect(() => {
		if (isDirtyRef.current) {
			setPersistedState({
				players: state.players,
				config: state.config,
				scores,
			})
		}

		isDirtyRef.current = true
	}, [state.players, state.config, scores])

	const actions = useForever({
		addPlayer(name: string) {
			setState(prev => {
				const id = 1 + prev.players.reduce((maxId, p) => p.id > maxId ? p.id : maxId, 0)

				return {
					...prev,
					players: prev.players.concat({ id, name }),
					scores: { ...prev.scores, [id]: [] },
				}
			})
		},
		updatePlayer(id: PlayerId, name: string) {
			set.players(prev => prev.map(p => p.id === id ? { id, name } : p))
		},
		deletePlayer(id: PlayerId) {
			set.players(prev => prev.filter(p => p.id !== id))
		},
		updateScores(points: FormState) {
			setState(prev => {
				const scores: ScoreState = {}

				for (const { id } of prev.players) {
					const existing = prev.scores[id]
					const incoming = points[id]

					scores[id] = (typeof incoming === 'number' || prev.config.submitNulls) ? existing.concat(incoming ?? 0) : existing
				}

				return {
					...prev,
					scores,
				}
			})
		},
		amendScore(id: PlayerId, index: number, points: number | null) {
			set.scores(prev => {
				return {
					...prev,
					[id]: mutateAtIndex(prev[id], index, points),
				}
			})
		},
		resetScores() {
			setState(prev => ({
				...prev,
				scores: getInitialScores({ players: prev.players })
			}))
		},
		setConfig: set.config,
	})

	return [state, actions] as const
}
