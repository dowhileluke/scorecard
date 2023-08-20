import { FormEvent } from 'react'
import { Icon, Trash2 } from 'react-feather'
import { Override } from '../../types'
import { Button } from '../primitives/interactive'
import { Modal, ModalProps } from '../primitives/modal'
import classes from './form-modal.module.css'

type Actions = {
	onSubmit?: () => void;
	onDestroy?: () => void;
	isSubmitDisabled?: boolean;
	isCancelHidden?: boolean;
	submitLabel?: string;
	destroyLabel?: string;
	destroyIcon?: Icon | null;
	isQuickDestroy?: boolean;
	destroyQuestion?: string;
}

export function FormModal({
	onClose, isCancelHidden = false,
	onSubmit, submitLabel = 'Confirm', isSubmitDisabled = false,
	onDestroy, destroyLabel = 'Delete', destroyIcon: DIcon = Trash2, isQuickDestroy = false,
	destroyQuestion = 'Are you sure?',
	children, ...props
}: Override<ModalProps, Actions>) {
	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		onSubmit?.()
	}

	function handleDestroy() {
		if (isQuickDestroy || confirm(destroyQuestion)) {
			onDestroy?.()
		}
	}

	return (
		<Modal
			{...props}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{children}
			<div className={classes.actions}>
				{onDestroy && (
					<Button onClick={handleDestroy} variant="danger">
						{DIcon && (<DIcon size="1em" />)}
						{' '}
						{destroyLabel}
					</Button>
				)}
				<div className="spacer" />
				{!isCancelHidden && (<Button onClick={onClose}>Cancel</Button>)}
				<Button type="submit" disabled={isSubmitDisabled} variant="success">
					{submitLabel}
				</Button>
			</div>
		</Modal>
	)
}
