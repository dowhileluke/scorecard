import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import classes from './interactive.module.css'
import { merge } from "../functions/merge";

function InputWithRef(
	{ className, ...props }: ComponentPropsWithoutRef<'input'>,
	fwdRef: ForwardedRef<HTMLInputElement>,
) {
	return (
		<input
			ref={fwdRef}
			className={merge(classes.input, className)}
			{...props}
		/>
	)
}

export const Input = forwardRef(InputWithRef)
