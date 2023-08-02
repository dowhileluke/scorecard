import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { Override } from "../types";

type IntegerProps = {
	value: number | null;
	onChange: (value: number | null) => void;
}

type IntegerInputProps = Override<ComponentPropsWithoutRef<'input'>, IntegerProps>

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

export const IntegerInput = forwardRef<HTMLInputElement, IntegerInputProps>(
	({ value, onChange, ...props }, fwdRef) => {
		const [isNakedMinus, setIsNakedMinus] = useState(false)

		function handleChange(s: string) {
			const digits = toDigits(s)
			const isMinus = digits === '-'
			const isNull = isMinus || digits === ''

			setIsNakedMinus(isMinus)
			onChange(isNull ? null : parseInt(digits, 10))
		}

		return (
			<input
				ref={fwdRef}
				value={toTextValue(value, isNakedMinus)}
				onChange={e => handleChange(e.target.value)}
				inputMode="numeric"
				{...props}
			/>
		)
	}
)
