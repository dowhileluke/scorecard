import { FormEvent, Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classes from './modal.module.css'

export type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	onSubmit?: (e: FormEvent) => void;
	children?: ReactNode;
}

export function Modal({ isOpen, onClose, title, onSubmit, children }: ModalProps) {
	const fullscreen = `viewport-height ${classes.full} centered`

	return (
		<Transition
			as={Fragment}
			show={isOpen}
			appear
		>
			<Dialog onClose={onClose} className={fullscreen}>
				<Transition.Child
					as={Fragment}
					enter={classes.fade}
					enterFrom={classes.start}
					enterTo={classes.finish}
					leave={classes.fade}
					leaveFrom={classes.finish}
					leaveTo={classes.start}
				>
					<div className={`${fullscreen} ${classes.blur} darken`} />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter={`${classes.fade} ${classes.scale}`}
					enterFrom={classes.start}
					enterTo={classes.finish}
					leave={`${classes.fade} ${classes.scale}`}
					leaveFrom={classes.finish}
					leaveTo={classes.start}
				>
					<Dialog.Panel as={onSubmit ? 'form' : 'div'} onSubmit={onSubmit} className={`mza ${classes.panel}`}>
						<Dialog.Title className={classes.title}>
							{title}
						</Dialog.Title>
						{children}
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	)
}
