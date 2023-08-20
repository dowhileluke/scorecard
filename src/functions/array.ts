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

export function toggleInclusion<T>(array: T[], item: T) {
	const filtered = array.filter(x => x !== item)

	if (filtered.length !== array.length) return filtered

	return array.concat(item)
}
