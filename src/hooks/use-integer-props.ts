import { ChangeEventHandler, useState } from 'react'

export type IntegerProps = {
	value: number | null;
	onChange: (value: number | null) => void;
}

type InputProps = {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	inputMode: 'numeric';
}

const nonDigits = /\D/g

function toDigits(s: string) {
	const isNegative = s.charAt(0) === '-'
	const text = isNegative ? s.slice(1) : s
	const digits = text.replace(nonDigits, '')
	
	return isNegative ? '-' + digits : digits
}

function toTextValue(n: number | null, isNakedMinus: boolean) {
	if (n === null) {
		return isNakedMinus ? '-' : ''
	}

	return n.toString()
}

export function useIntegerProps<T extends IntegerProps>({ value, onChange, ...props }: T) {
	const [isNakedMinus, setIsNakedMinus] = useState(false)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const digits = toDigits(e.target.value)
		const isMinus = digits === '-'
		const isNull = isMinus || digits === ''

		setIsNakedMinus(isMinus)
		onChange(isNull ? null : parseInt(digits, 10))
	}

	const result: Omit<T, keyof IntegerProps> & InputProps = {
		...props,
		value: toTextValue(value, isNakedMinus),
		onChange: handleChange,
		inputMode: 'numeric',
	}

	return result
}
