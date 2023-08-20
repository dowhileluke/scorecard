import { useEffect, useRef } from 'react'
import { CheckCircle, Circle, Icon, Send, UserPlus, X } from 'react-feather'
import { truthy } from '@dowhileluke/fns'
import { ManageFormState, ModalState, Player, PlayerId } from '../../types'
import { concat } from '../../functions/concat'
import { useManageForm } from '../../hooks/use-manage-form'
import { Button, Input } from '../primitives/interactive'
import { FormModal } from './form-modal'
import classes from './manage-players-modal.module.css'

type ManagePlayersModalProps = {
	state: ModalState;
	players: Player[];
	onSubmit: (state: ManageFormState, resetScores: boolean) => void;
	onClose: () => void;
}

function icon(I: Icon) {
	return (
		<I size="0.8em" />
	)
}

export function ManagePlayersModal({ state, players, onSubmit, onClose }: ManagePlayersModalProps) {
	const isOpen = state.mode === 'MANAGE'
	const [formState, form] = useManageForm()
	const newestRef = useRef<HTMLInputElement>(null)

	// derived state
	const deletingCount = truthy(Object.values(formState.deletedIds)).length
	const addingCount = truthy(formState.addedNames).length
	const isModified = deletingCount + addingCount > 0
	const isAllRemoved = deletingCount === players.length
	const submitLabel = truthy(
		deletingCount && `Remove ${isAllRemoved ? 'All' : deletingCount}`,
		addingCount && `Add ${addingCount}`,
	).join(', ')

	useEffect(() => {
		newestRef.current?.focus()
	}, [formState.addedNames.length])

	useEffect(() => {
		form.reset()
	}, [isOpen])

	function handleSubmit() {
		if (!isOpen) return

		onSubmit(formState, false)
		onClose()
	}

	function handleReset() {
		if (!isOpen) return

		onSubmit(formState, true)
		onClose()
	}

	function handleToggle() {
		if (deletingCount) {
			form.setDeletedIds({})
		} else {
			form.setDeletedIds(players.reduce((result, p) => {
				result[p.id] = true

				return result
			}, {} as Record<PlayerId, boolean>))
		}
	}

	const toggleButton = players.length > 0 && (
		<Button
			onClick={handleToggle}
			className={concat(classes.toggler, deletingCount && classes.deleting)}
		>
			{icon(deletingCount ? Circle : CheckCircle)}
			Toggle All
		</Button>
	)

	return (
		<FormModal
			title="Manage Players"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isSubmitDisabled={!isModified}
			submitLabel={submitLabel || 'Save'}
			headerNode={toggleButton}
			destroyIcon={Send}
			onDestroy={handleReset}
			destroyLabel=""
			destroyQuestion={submitLabel ? submitLabel + ', and reset all scores?' : 'Reset all scores?'}
		>
			<div className={classes.list}>
				{players.map(p => {
					const isDeleting = formState.deletedIds[p.id]

					return (
						<Button
							key={p.id}
							onClick={() => form.toggleId(p.id)}
							className={classes[isDeleting ? 'deleting' : '']}
						>
							{icon(isDeleting ? Circle : CheckCircle)}
							{p.name}
						</Button>
					)
				})}
				{formState.addedNames.map((n, i) => (
					<div key={i} className={classes.adding}>
						<Button onClick={() => form.removeOne(i)}>
							{icon(X)}
						</Button>
						<Input
							ref={i + 1 === formState.addedNames.length ? newestRef : undefined}
							value={n}
							onChange={e => form.updateOne(i, e.target.value)}
						/>
					</div>
				))}
				<Button onClick={form.addOne}>
					<UserPlus size="1.25em" />
				</Button>
			</div>
		</FormModal>
	)
}
