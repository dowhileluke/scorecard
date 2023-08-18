import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { concat } from '../../functions/concat'
import classes from './interactive.module.css'

type Variant = {
	variant?: 'none' | 'danger' | 'success'
}

export function Button({ variant = 'none', className, ...props }: Variant & ComponentPropsWithoutRef<'button'>) {
	return (
		<button
			type="button"
			className={concat(
				'centered',
				classes.button,
				className,
				classes[variant],
			)}
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
