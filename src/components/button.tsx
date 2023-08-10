import { CSSProperties, ComponentPropsWithoutRef } from "react"
import classes from './interactive.module.css'
import { merge, mergeStyles } from "../functions/merge"

type ButtonProps = {
	isIcon?: boolean;
	color?: CSSProperties['color']
}

export function Button({
	color, isIcon = false, className, style, ...props
}: ButtonProps & ComponentPropsWithoutRef<'button'>) {
	return (
		<button
			className={merge(classes.button, isIcon && classes.icon, className)}
			style={mergeStyles(color && { color }, style)}
			type="button"
			{...props}
		/>
	)
}
