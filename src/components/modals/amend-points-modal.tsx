import { useEffect, useRef } from 'react';
import { ModalState, PlayerId, ScoreState } from '../../types'
import { clamp } from '../../functions/clamp';
import { useDraftState } from '../../hooks/use-draft-state'
import { IntegerInput } from '../integer-input'
import { FormModal } from './form-modal'

type AmendPointsModalProps = {
	state: ModalState;
	scores: ScoreState;
	onClose: () => void;
	onSubmit: (id: PlayerId, index: number, value: number | null) => void;
}

export function AmendPointsModal({ state, scores, onClose, onSubmit }: AmendPointsModalProps) {
	const isOpen = state.mode === 'AMEND'
	const ref = useRef<HTMLInputElement>(null)
	const [value, setValue] = useDraftState(isOpen ? scores[state.player.id][state.index] : null)

	useEffect(() => {
		if (isOpen) setTimeout(() => ref.current?.select(), 1)
	}, [isOpen])

	function handleSubmit() {
		if (!isOpen) return

		onSubmit(state.player.id, state.index, value)
		onClose()
	}

	function handleDelete() {
		if (!isOpen) return

		onSubmit(state.player.id, state.index, null)
		onClose()
	}

	return (
		<FormModal
			title="Amend Points"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			onDestroy={handleDelete}
			isQuickDestroy
			isSubmitDisabled={value === null}
		>
			<IntegerInput ref={ref} value={value} onChange={n => setValue(clamp(n))} />
		</FormModal>
	)
}
