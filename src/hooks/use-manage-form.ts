import { useState } from 'react'
import { ManageFormState, PlayerId } from '../types'
import { useForever } from './use-forever'
import { removeAtIndex, updateAtIndex } from '../functions/array'

const INIT_STATE: ManageFormState = {
	deletedIds: {},
	addedNames: [],
}

export function useManageForm() {
	const [state, setState] = useState(INIT_STATE)

	const actions = useForever({
		toggleId(id: PlayerId) {
			setState(prev => ({
				...prev,
				deletedIds: {
					...prev.deletedIds,
					[id]: !prev.deletedIds[id],
				},
			}))
		},
		setDeletedIds(deletedIds: Record<PlayerId, boolean>) {
			setState(prev => ({
				...prev,
				deletedIds,
			}))
		},
		addOne() {
			setState(prev => ({
				...prev,
				addedNames: prev.addedNames.concat(''),
			}))
		},
		updateOne(index: number, value: string) {
			setState(prev => ({
				...prev,
				addedNames: updateAtIndex(prev.addedNames, index, value),
			}))
		},
		removeOne(index: number) {
			setState(prev => ({
				...prev,
				addedNames: removeAtIndex(prev.addedNames, index),
			}))
		},
		reset() {
			setState(INIT_STATE)
		},
	})

	return [state, actions] as const
}
