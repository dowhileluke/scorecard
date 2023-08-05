import { CSSProperties, ComponentPropsWithoutRef } from 'react'
import classes from './grid.module.css'
import { merge, mergeStyles } from '../functions/merge';

type GridProps = {
	centered?: boolean;
	fullHeight?: boolean;
	gap?: CSSProperties['gap'];
	inline?: boolean;
	templateCols?: CSSProperties['gridTemplateColumns'];
	templateRows?: CSSProperties['gridTemplateRows'];
}

export function Grid({
	centered = false, fullHeight = false, gap, inline = false, templateCols, templateRows, className, style, ...props
}: GridProps & ComponentPropsWithoutRef<'div'>) {
	const gridStyle: CSSProperties = {}

	if (gap) gridStyle.gap = gap;
	if (templateCols) gridStyle.gridTemplateColumns = templateCols
	if (templateRows) gridStyle.gridTemplateRows = templateRows

	return (
		<div
			className={merge(
				centered && classes.middle,
				fullHeight && classes.tall,
				inline ? classes.inline : classes.grid,
				className
			)}
			style={mergeStyles(gridStyle, style)}
			{...props}
		/>
	)
}
