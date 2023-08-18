import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react'
import { concat } from '../../functions/concat'
import classes from './interactive.module.css'

export function Button({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
	return (
		<button
			type="button"
			className={concat('centered', classes.button, className)}
			{...props}
		/>
	)
}

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(({ className, ...props }, fwdRef) => (
	<input
		ref={fwdRef}
		className={concat(classes.input, className)}
		type="text"
		autoComplete="off"
		name="search" // ios safari hack
		{...props}
	/>
))
