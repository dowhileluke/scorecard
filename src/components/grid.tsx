import { CSSProperties, PropsWithChildren } from 'react'
import classes from './grid.module.css'

type GridProps = {
	templateCols?: string;
	templateRows?: string;
}

export function Grid({ templateCols, templateRows, children }: PropsWithChildren<GridProps>) {
	const gridStyle: CSSProperties = {
		gridTemplateColumns: templateCols,
		gridTemplateRows: templateRows,
	}

	return (
		<div className={classes.grid} style={gridStyle}>
			{children}
		</div>
	)
}
