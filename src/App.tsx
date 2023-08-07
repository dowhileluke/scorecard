import { useSettings } from './hooks/use-settings'
import { Grid } from './components/grid'
import { Columns } from './components/columns'
import { Label } from './components/label'
import { Scores } from './components/scores'
import { useState } from 'react'
import { AppState, CallMode, ModalState } from './types'
import { Button } from './components/button'
import { removeAtIndex } from './functions/remove-at-index'
import { Modal } from './components/modal'

const INITIAL_SCORES: AppState = {
	p1: [],
	p2: [2, 13],
}

const INITAL_MODAL: ModalState = {
	p1: null,
	p2: null,
	mode: null,
	caller: null,
}


export function App() {
	const [settings, setSettings] = useSettings()
	const [scores, setScores] = useState(INITIAL_SCORES)
	const [modalState, setModalState] = useState(INITAL_MODAL)

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
			const score = prompt('Override this score? (0 to remove)', scores[p][index].toString())

			if (score === null) return

			const parsedScore = parseInt(score)

			if (score === '' || parsedScore === 0) {
				setScores(prev => ({ ...prev, [p]: removeAtIndex(prev[p], index) }))
			} else if (score !== null) {
				setScores(prev => ({ ...prev, [p]: prev[p].map((n, i) => i === index ? parsedScore : n) }))
			}
		}
	}

	function columnFor(p: keyof AppState) {
		return (
			<div>
				<Label onEdit={handleRenameFor(p)}>
					{settings[p]}
				</Label>
				<Scores values={scores[p]} onEdit={handleOverrideFor(p)} />
			</div>
		)
	}

	function buttonFor(caller: keyof AppState, mode: CallMode) {
		const callerScore = mode === 'Gin' ? 0 : null

		return (
			<Button onClick={() => setModalState(prev => ({ ...prev, caller, mode, [caller]: callerScore, }))}>
				{mode}
			</Button>
		)
	}

	return (
		<Grid className="viewport" templateRows="1fr auto">
			<Columns
				one={columnFor('p1')}
				two={columnFor('p2')}
			/>
			<Grid
				inline
				gap
				templateCols="auto auto"
				templateRows="auto auto"
				className="viewport-width"
			>
				{buttonFor('p1', 'Knock')}
				{buttonFor('p2', 'Knock')}
				{buttonFor('p1', 'Gin')}
				{buttonFor('p2', 'Gin')}
			</Grid>
			<Modal isOpen={Boolean(modalState.mode)} onClose={() => setModalState(INITAL_MODAL)}>
				modal here
			</Modal>
		</Grid>
	)
}
