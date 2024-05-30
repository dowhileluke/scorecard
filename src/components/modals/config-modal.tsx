import { Send } from 'react-feather';
import { Config, ModalState } from '../../types'
import { Input } from '../primitives/interactive'
import { FormModal } from './form-modal'

type ConfigModalProps = {
	state: ModalState;
	values: Config;
	onChange: (values: Config) => void;
	onReset: () => void;
	onDone: () => void;
}

export function ConfigModal({ state, values, onChange, onReset, onDone }: ConfigModalProps) {
	function handleChange(diff: Partial<Config>) {
		onChange({ ...values, ...diff })
	}

	function handleReset() {
		onReset()
		onDone()
	}

	return (
		<FormModal
			title="Game Settings"
			isOpen={state.mode === 'CONFIG'}
			onClose={onDone}
			onSubmit={onDone}
			submitLabel="Done"
			onDestroy={handleReset}
			destroyLabel="Reset Scores"
			destroyIcon={Send}
			isCancelHidden
		>
			<div>
				<label>
					<Input
						type="checkbox"
						checked={values.submitNulls}
						onChange={e => handleChange({ submitNulls: e.target.checked })}
					/> Blanks become zeroes (+0) on submit
				</label>
			</div>
			<div>
				<label>
					<Input
						type="checkbox"
						checked={values.persistScores}
						onChange={e => handleChange({ persistScores: e.target.checked })}
					/> Restore scores when the app reloads
				</label>
			</div>
			<div>
				<label>
					<Input
						type="checkbox"
						checked={values.showRunningTotals}
						onChange={e => handleChange({ showRunningTotals: e.target.checked })}
					/> Include running totals
				</label>
			</div>
		</FormModal>
	)
}
