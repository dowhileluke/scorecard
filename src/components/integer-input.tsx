import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react'
import { Override } from '../types'
import { IntegerProps, useIntegerProps } from '../hooks/use-integer-props'

type IntegerInputProps = Override<ComponentPropsWithoutRef<'input'>, IntegerProps>

function IntegerInputWithRef(props: IntegerInputProps, fwdRef: ForwardedRef<HTMLInputElement>) {
	const integerProps = useIntegerProps(props)

	return (
		<input
			ref={fwdRef}
			{...integerProps}
		/>
	)
}

export const IntegerInput = forwardRef(IntegerInputWithRef)
