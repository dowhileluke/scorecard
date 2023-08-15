import { useState } from 'react'
import './app.css'
import { ScoreTable } from './components/score-table'
import { Button } from './components/button'
import { usePlayers } from './hooks/use-players'
import { Editable2 } from './components/editable2'
import { Player } from './types'
import { sum } from '@dowhileluke/fns'
import { IntegerInput } from './components/integer-input'

function initializePoints(players: Player[]) {
	const result: Record<number, number[]> = {}

	for (const p of players) {
		result[p.id] = [1]
	}

	return result
}

const INITIAL_PENDING: Record<number, number | null | undefined> = {}

export function App() {
	const [players, setPlayers] = usePlayers()
	const [points, setPoints] = useState(() => initializePoints(players))
	const [pending, setPending] = useState(INITIAL_PENDING)
	const pendingSum = sum(players, p => pending[p.id] ?? 0)

	return (
		<>
			<form className="viewport-height app">
				<div className="col-group">
					{players.map(p => (
						<div key={p.id} className="app-col" style={{ flexShrink: p.name.length }}>
							<Editable2 value={p.name} className="label m0a" />
							<ScoreTable points={points[p.id]} />
							{/* <div style={{ width: '6ch', height: '1ch', background: 'red' }} /> */}
							<div className="score m0a">
								<div className="mini label">{p.name}</div>
								<IntegerInput
									className="score"
									value={pending[p.id] ?? null}
									onChange={n => setPending(prev => ({ ...prev, [p.id]: n }))}
								/>
							</div>
						</div>
					))}
				</div>
				<div>
					controls
				</div>
			</form>
		</>
	)
}
