export function toRunningTotals(nums: number[]) {
	const result: number[] = []
	let total = 0

	for (const value of nums) {
		total += value

		result.push(total)
	}

	return result
}
