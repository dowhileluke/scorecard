import { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { useResultForever } from './use-forever'

type Collection = Record<string, unknown>
type SetterCollection<T extends Collection> = {
	[K in keyof T]: Dispatch<SetStateAction<T[K]>>
}

function getSetters<T extends Collection>(data: T, setData: Dispatch<SetStateAction<T>>) {
	const result: Collection = {}

	for (const key of Object.keys(data)) {
		result[key] = (valueOrFunction: SetStateAction<unknown>) => {
			if (valueOrFunction instanceof Function) {
				setData(previous => ({
					...previous,
					[key]: valueOrFunction(previous[key]) as unknown,
				}))
			} else {
				setData(previous => ({ ...previous, [key]: valueOrFunction }))
			}
		}
	}

	return result as SetterCollection<T>
}

export function useCollection<T extends Collection>(initialState: T | (() => T)) {
	const [state, setState] = useState(initialState)
	const setters = useResultForever(() => getSetters(state, setState))

	return [state, setters, setState] as const
}
