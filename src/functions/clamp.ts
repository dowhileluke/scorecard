const MAX = 9999

export function clamp(n: number | null) {
	if (n === null) return n
	if (n > MAX) return MAX
	if (n < -MAX) return -MAX
	
	return n
}
