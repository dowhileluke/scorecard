export function removeAtIndex<T>(array: T[], index: number) {
	const preIndex = array.slice(0, index)
	const postIndex = array.slice(index + 1)

	return preIndex.concat(postIndex)
}
