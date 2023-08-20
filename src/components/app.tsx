import { concat } from '../functions/concat'
import { useGameState } from '../hooks/use-game-state'
import { useModalState } from '../hooks/use-modal-state'
import { Editable } from './editable'
import { ScoreTable } from './score-table'
import { PointsForm } from './points-form'
import { ConfigModal } from './modals/config-modal'
import { EditPlayerModal } from './modals/edit-player-modal'
import { AmendPointsModal } from './modals/amend-points-modal'
import { ActionButtons } from './action-buttons'
import { ManagePlayersModal } from './modals/manage-players-modal'
import { Button } from './primitives/interactive'
import { Users } from 'react-feather'

export function App() {
	const [gameState, game] = useGameState()
	const [modalState, setMode] = useModalState()

	return (
		<div className="viewport-height app">
			<div className="col-group trim">
				{gameState.players.map(p => (
					<div key={p.id} className="app-col" style={{ flexShrink: p.name.length }}>
						<Editable className="mza font-2x" onClick={() => setMode.editPlayer(p)}>
							<div className={concat('fancy underline', p.name.length < 3 && 'brief')}>
								{p.name}
							</div>
						</Editable>
						<ScoreTable points={gameState.scores[p.id]} onClick={index => setMode.amendScore(p, index)}/>
					</div>
				))}
				{gameState.players.length === 0 && (
					<div className="empty-col centered">
						<div className="fancy font-2x">Nobody is here...</div>
						<Button variant="success" onClick={setMode.manage}>
							<Users size="1.25em" /> Add Players
						</Button>
						<div>and get the party started!</div>
					</div>
				)}
			</div>
			<div className="col-group">
				<PointsForm
					players={gameState.players}
					onSubmit={game.updateScores}
					placeholder={gameState.config.submitNulls ? '0' : ''}
				>
					<ActionButtons
						onConfig={setMode.config}
						onManage={setMode.manage}
					/>
				</PointsForm>
			</div>

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
			<ManagePlayersModal
				state={modalState}
				players={gameState.players}
				onSubmit={game.updateManyPlayers}
				onClose={setMode.idle}
			/>
		</div>
	)
}
