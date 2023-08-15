import { useEffect, useRef } from 'react'
import { sum } from '@dowhileluke/fns'
import { signed } from '../functions/signed'
import classes from './score-table.module.css'
import { Editable } from './editable'

type ScoreTableProps = {
	points: number[];
	onClick?: (index: number) => void;
}

export function ScoreTable({ points, onClick }: ScoreTableProps) {
	const sumRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		sumRef.current?.scrollIntoView(false)
	}, [points])

	return (
		<div className={classes.list}>
			{points.map((s, index) => (
				<Editable key={index} onClick={() => onClick?.(index)}>
					{signed(s)}
				</Editable>
			))}
			<div ref={sumRef} className={points.length ? classes.sum : ''}>
				{sum(points)}
			</div>
		</div>
	)
}
