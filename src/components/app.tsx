import { Settings, UserPlus } from 'react-feather'
import { concat } from '../functions/concat'
import { useGameState } from '../hooks/use-game-state'
import { useModalState } from '../hooks/use-modal-state'
import { Editable } from './editable'
import { ScoreTable } from './score-table'
import { PointsForm } from './points-form'
import { Button } from './primitives/interactive'
import classes from './app.module.css'
import { ConfigModal } from './modals/config-modal'
import { EditPlayerModal } from './modals/edit-player-modal'
import { AmendPointsModal } from './modals/amend-points-modal'
import { AddPlayerModal } from './modals/add-player-modal'

export function App() {
	const [gameState, game] = useGameState()
	const [modalState, setMode] = useModalState()

	return (
		<div className="viewport-height app">
			<div className="col-group trim">
				{gameState.players.map(p => (
					<div key={p.id} className="app-col" style={{ flexShrink: p.name.length }}>
						<Editable className="mza heading" onClick={() => setMode.editPlayer(p)}>
							<div className={concat('fancy', p.name.length < 3 && 'brief')}>
								{p.name}
							</div>
						</Editable>
						<ScoreTable points={gameState.scores[p.id]} onClick={index => setMode.amendScore(p, index)}/>
					</div>
				))}
			</div>
			<PointsForm players={gameState.players} onSubmit={game.updateScores} placeholder={gameState.config.submitNulls ? '0' : ''}>
				<Button onClick={setMode.addPlayer}>
					<UserPlus size="1em" />
				</Button>
				<Button onClick={setMode.config}>
					<Settings size="1em" />
				</Button>
			</PointsForm>

			<AddPlayerModal
				state={modalState}
				onClose={setMode.idle}
				onSubmit={game.addPlayer}
			/>
			<EditPlayerModal
				state={modalState}
				onClose={setMode.idle}
				onSubmit={game.updatePlayer}
				onDelete={game.deletePlayer}
			/>
			<AmendPointsModal
				state={modalState}
				scores={gameState.scores}
				onClose={setMode.idle}
				onSubmit={game.amendScore}
			/>
			<ConfigModal
				state={modalState}
				values={gameState.config}
				onChange={game.setConfig}
				onDone={setMode.idle}
				onReset={game.resetScores}
			/>
		</div>
	)
}
