export function removeAtIndex<T>(array: T[], index: number) {
	return array.filter((_, i) => i !== index)
}

export function updateAtIndex<T>(array: T[], index: number, value: T) {
	return array.map((x, i) => i === index ? value : x)
}

export function mutateAtIndex<T>(array: T[], index: number, value: T | null) {
	if (value === null) return removeAtIndex(array, index)

	return updateAtIndex(array, index, value)
}
