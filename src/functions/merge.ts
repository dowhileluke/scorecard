import { truthy, Falsy } from '@dowhileluke/fns'
import { CSSProperties } from 'react'

export function merge(...classNames: Array<string | Falsy>) {
	return truthy(classNames).join(' ')
}

export function mergeStyles(...styles: Array<CSSProperties | Falsy>) {
	const definedStyles = truthy(styles)

	if (definedStyles.length === 0) return

	return definedStyles.reduce((result, s) => ({ ...result, ...s }))
}
