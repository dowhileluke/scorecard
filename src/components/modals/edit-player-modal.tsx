import { useEffect, useRef } from 'react'
import { UserX } from 'react-feather'
import { ModalState, PlayerId } from '../../types'
import { useDraftState } from '../../hooks/use-draft-state'
import { Input } from '../primitives/interactive'
import { FormModal } from './form-modal'

type EditPlayerModalProps = {
	state: ModalState;
	onSubmit: (id: PlayerId, name: string) => void;
	onDelete: (id: PlayerId) => void;
	onClose: () => void;
}

export function EditPlayerModal({ state, onSubmit, onDelete, onClose }: EditPlayerModalProps) {
	const isOpen = state.mode === 'EDIT'
	const ref = useRef<HTMLInputElement>(null)
	const [text, setText] = useDraftState(isOpen ? state.player.name : '')

	useEffect(() => {
		if (isOpen) setTimeout(() => ref.current?.select(), 1)
	}, [isOpen])

	function handleSubmit() {
		if (!isOpen) return

		onSubmit(state.player.id, text)
		onClose()
	}

	function handleDestroy() {
		if (!isOpen) return

		onDelete(state.player.id)
		onClose()
	}

	return (
		<FormModal
			title="Edit Player"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			onDestroy={handleDestroy}
			isSubmitDisabled={!text}
			destroyIcon={UserX}
		>
			<div>
				<label className="label-text">Name</label>
				<Input ref={ref} value={text} onChange={e => setText(e.target.value)} />
			</div>
		</FormModal>
	)
}
