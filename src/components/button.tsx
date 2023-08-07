import { CSSProperties, ComponentPropsWithoutRef } from "react"
import classes from './interactive.module.css'
import { merge, mergeStyles } from "../functions/merge"

type Colored = {
	color?: CSSProperties['color']
}

export function Button({
	color, className, style, ...props
}: Colored & ComponentPropsWithoutRef<'button'>) {
	return (
		<button
			className={merge(classes.button, className)}
			style={mergeStyles({ color }, style)}
			type="button"
			{...props}
		/>
	)
}
