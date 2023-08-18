import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { Override } from '../types'
import { IntegerProps, useIntegerProps } from '../hooks/use-integer-props'
import { Input } from './primitives/interactive'

type IntegerInputProps = Override<ComponentPropsWithoutRef<'input'>, IntegerProps>

export const IntegerInput = forwardRef<HTMLInputElement, IntegerInputProps>((props, fwdRef) => {
	const integerProps = useIntegerProps(props)
	
	return (
		<Input ref={fwdRef} {...integerProps} />
	)
})
