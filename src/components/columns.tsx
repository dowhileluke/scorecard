import { ReactNode } from 'react'
import { merge } from '../functions/merge'
import classes from './columns.module.css'

type ColumnsProps = {
	one: ReactNode;
	two: ReactNode;
}

export function Columns({ one, two }: ColumnsProps) {
	return (
		<div className={merge(classes.container, 'viewport-width')}>
			<div className={classes.side} />
			{one}
			<div className={classes.gap} />
			{two}
			<div className={classes.side} />
		</div>
	)
}
