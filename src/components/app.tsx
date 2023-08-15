import { useState } from 'react'
import { concat } from '../functions/concat'
import { usePlayers } from '../hooks/use-players'
import { FormState, Player, ScoreState } from '../types'
import classes from './app.module.css'
import { ScoreTable } from './score-table'
import { UserPlus } from 'react-feather'
import { Editable } from './editable'
import { Form } from './form'

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

	function handleSubmit(values: FormState) {
		setScores(prev => {
			const result: ScoreState = {}

			for (const { id } of players) {
				const existing = prev[id]
				const incoming = values[id]

				result[id] = typeof incoming === 'number' ? existing.concat(incoming) : existing
			}

			return result
		})
	}

	return (
		<div className={concat(classes.app, 'viewport-height')}>
			<div className="col-group trim">
				{players.map((p, i) => (
					<div key={p.id} className="app-col" style={{ flexShrink: p.name.length }}>
						<Editable className="mza heading" onClick={() => alert(i)}>
							<div className={concat('fancy', p.name.length < 3 && 'brief')}>
								{p.name}	
							</div>
						</Editable>
						{/* <div className="stack oh mza">
							<div className="under label">
								<div className="label">
									{i ? (
										<>{'dg'.repeat(i + 1)} {'i'.repeat(i + 1)}</>
									) : (
										'H'
									)}
								</div>
							</div>
							<div className="over">
								<Edit2 />
							</div>
						</div> */}
						<ScoreTable points={scores[p.id]} onClick={(idx) => alert('index: ' + idx)}/>
					</div>
				))}
			</div>
			<Form players={players} onSubmit={handleSubmit}>
				<button>
					<UserPlus size="1em" />
				</button>
			</Form>
		</div>
	)
}
