import { truthy, Falsy } from '@dowhileluke/fns'

export function merge(...classNames: Array<string | Falsy>) {
	return truthy(classNames).join(' ')
}
