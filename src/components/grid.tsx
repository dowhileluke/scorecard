import { CSSProperties, PropsWithChildren } from 'react'
import classes from './grid.module.css'
import { ClassNamed } from '../types';
import { merge } from '../functions/merge';

type GridProps = {
	fullHeight?: boolean;
	templateCols?: string;
	templateRows?: string;
}

export function Grid({ fullHeight = false, templateCols, templateRows, className, children }: PropsWithChildren<GridProps & ClassNamed>) {
	const gridStyle: CSSProperties = {}

	if (fullHeight) gridStyle.height = '100%'
	if (templateCols) gridStyle.gridTemplateColumns = templateCols
	if (templateRows) gridStyle.gridTemplateRows = templateRows

	return (
		<div className={merge(classes.grid, className)} style={gridStyle}>
			{children}
		</div>
	)
}
