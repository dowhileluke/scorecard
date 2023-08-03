import { useState } from 'react'
import { useForever } from './useForever'

export function useDiffState<T>(initialState: T | (() => T)) {
	const [state, setState] = useState(initialState)

	function setDiffState(diff: Partial<T> | ((value: T) => Partial<T>)) {
		setState(prev => {
			const changes = diff instanceof Function ? diff(prev) : diff
			
			return { ...prev, ...changes }
		})
	}

	return [state, useForever(setDiffState)] as const
}
