import { FormEvent, useState } from 'react'
import { Grid } from './components/grid'
import { Editable2 } from './components/editable2'
import { usePlayers } from './hooks/use-players'
import { Player, ScoreState } from './types'
import { Button } from './components/button'
import { Edit2, Plus } from 'react-feather'
import { IntegerInput } from './components/integer-input'
import { sum } from '@dowhileluke/fns'
import { ScoreTable } from './components/score-table'
import { Overlap } from './components/overlap'

function initializeScores(players: Player[]) {
	const result: ScoreState = {}

	for (const p of players) {
		result[p.id] = []
	}

	return result
}

export function App() {
	const [players, setPlayers] = usePlayers()
	const [scores, setScores] = useState(() => initializeScores(players))
	const [pending, setPending] = useState<Record<number, number | null | undefined>>({})
	const pendingSum = sum(players, p => pending[p.id] ?? 0)

	function handleRename(player: Player) {
		const name = prompt("Rename this player?", player.name)

		if (name === null) return

		if (name === '') {
			setPlayers(prev => prev.filter(p => p.id !== player.id))
		} else {
			setPlayers(prev => prev.map(p => p.id === player.id ? { ...p, name } : p))
		}
	}

	function handleEdit(id: number, index: number) {
		const existingScore = scores[id][index]
		const override = prompt('Override this score?', existingScore.toString())

		if (override === null) return

		if (override === '') {
			setScores(prev => ({
				...prev,
				[id]: prev[id].filter((_, i) => i !== index)
			}))
		} else {
			const editedScore = parseInt(override)

			if (typeof editedScore !== 'number' || Number.isNaN(editedScore)) return

			setScores(prev => ({
				...prev,
				[id]: prev[id].map((n, i) => i === index ? editedScore : n)
			}))
		}
	}

	function handleAdd() {
		const name = prompt("Add another player?")

		if (name) {
			const nextId = 1 + players.reduce((best, p) => p.id > best ? p.id : best, 1)

			setPlayers(prev => [...prev, { id: nextId, name }])
			setScores(prev => ({ ...prev, [nextId]: [], }))
		}
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		setScores(prev => {
			const result: ScoreState = {}

			for (const p of players) {
				const nextScore = pending[p.id]

				if (typeof nextScore === 'number') {
					result[p.id] = prev[p.id].concat(nextScore)
				} else {
					result[p.id] = prev[p.id]
				}
			}

			return result
		})

		setPending({})
	}

	return (
		<Grid className="viewport-height" templateRows="auto 1fr auto">
			<div className="col-group">
				{players.map(p => (
					<div key={p.id} className="col">
						<Editable2
							value={p.name}
							onClick={() => handleRename(p)}
							className="label"
						/>
					</div>
				))}
			</div>
			<div className="col-group" style={{ overflowY: 'auto' }}>
				{players.map(({ id, name }) => (
					<div key={id} className="col">
						<div className="hidden label">{name}</div>
						<ScoreTable scores={scores[id]} onClick={index => handleEdit(id, index)} />
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit}>
				<div className="col-group">
					{players.map(({ id, name }) => (
						<div key={id} className="col">
							<div className="hidden label">{name}</div>
							<IntegerInput
								value={pending[id] ?? null}
								onChange={n => setPending(prev => ({ ...prev, [id]: n }))}
								className="score"
							/>
						</div>
					))}
				</div>
				<Button onClick={handleAdd}>
					<Plus size="1em" />
				</Button>
				<Button type="submit" disabled={!pendingSum}>
					Submit {pendingSum} {pendingSum === 1 ? 'Point' : 'Points'}
				</Button>
			</form>
		</Grid>
	)
}
