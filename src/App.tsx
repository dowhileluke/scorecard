import { useSettings } from './hooks/use-settings'
import { Grid } from './components/grid'
import { Columns } from './components/columns'
import { Label } from './components/label'
import { Scores } from './components/scores'
import { useState } from 'react'
import { AppState } from './types'
import { Button } from './components/button'
import { removeAtIndex } from './functions/remove-at-index'

const INITIAL_STATE: AppState = {
	p1: [],
	p2: [2, 13],
}

export function App() {
	const [settings, setSettings] = useSettings()
	const [state, setState] = useState(INITIAL_STATE)

	function handleRenameFor(p: keyof AppState) {
		return () => {
			const name = prompt('Rename this player?', settings[p])

			if (name) {
				setSettings({ [p]: name })
			}
		}
	}

	function handleOverrideFor(p: keyof AppState) {
		return (index: number) => {
			const score = prompt('Override this score? (0 to remove)', state[p][index].toString())

			if (score === null) return

			const parsedScore = parseInt(score)

			if (score === '' || parsedScore === 0) {
				setState(prev => ({ ...prev, [p]: removeAtIndex(prev[p], index) }))
			} else if (score !== null) {
				setState(prev => ({ ...prev, [p]: prev[p].map((n, i) => i === index ? parsedScore : n) }))
			}
		}
	}

	function columnFor(p: keyof AppState) {
		return (
			<div>
				<Label onEdit={handleRenameFor(p)}>
					{settings[p]}
				</Label>
				<Scores values={state[p]} onEdit={handleOverrideFor(p)} />
			</div>
		)
	}

	return (
		<Grid className="viewport" templateRows="1fr auto">
			<Columns
				one={columnFor('p1')}
				two={columnFor('p2')}
			/>
			<div>
				<Button onClick={() => alert('btn')}>button</Button>
			</div>
		</Grid>
	)
}
