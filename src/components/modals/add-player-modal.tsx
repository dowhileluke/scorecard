import { useEffect, useState } from 'react'
import { ModalState } from '../../types'
import { Input } from '../primitives/interactive'
import { FormModal } from './form-modal'

type AddPlayerModalProps = {
	state: ModalState;
	onSubmit: (name: string) => void;
	onClose: () => void;
}

export function AddPlayerModal({ state, onSubmit, onClose }: AddPlayerModalProps) {
	const isOpen = state.mode === 'ADD'
	const [text, setText] = useState('')

	useEffect(() => setText(''), [isOpen])

	function handleSubmit() {
		if (!isOpen) return

		onSubmit(text)
		onClose()
	}

	return (
		<FormModal
			title="Add Player"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isSubmitDisabled={!text}
		>
			<div>
				<label className="label-text">Name</label>
				<Input value={text} onChange={e => setText(e.target.value)} />
			</div>
		</FormModal>
	)
}
