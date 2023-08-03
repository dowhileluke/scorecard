import { PropsWithChildren } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classes from './modal.module.css'
import { merge } from '../functions/merge';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
}

export function Modal({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
	return (
		<Transition
			show={isOpen}
		>
			<Dialog onClose={onClose} className={merge("root", classes.fullscreen, classes.ored)}>
				{/* <Dialog.Backdrop className={merge("backdrop", classes.black)} /> */}
				<Dialog.Panel className={merge("panel", classes.white)}>
					<Dialog.Title>
						Count Your <h1>Deadwood</h1>
					</Dialog.Title>
					{children}
				</Dialog.Panel>
			</Dialog>
		</Transition>
	)
}
