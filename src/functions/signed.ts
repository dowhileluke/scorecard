export function signed(n: number) {
	const s = n.toString()

	if (n < 0) return s

	return '+' + s
}
