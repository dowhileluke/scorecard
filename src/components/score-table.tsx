import { useEffect, useRef } from 'react'
import { sum } from '@dowhileluke/fns'
import { signed } from '../functions/signed'
import classes from './score-table.module.css'
import { Editable2 } from './editable2'

type ScoreTableProps = {
	points: number[];
	onClick?: (index: number) => void;
}

export function ScoreTable({ points, onClick }: ScoreTableProps) {
	const totalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		totalRef.current?.scrollIntoView(false)
	}, [points])

	return (
		<div className={classes.container}>
			{points.map((s, index) => (
				<Editable2
					key={index}
					value={signed(s)}
					onClick={() => onClick?.(index)}
				/>
			))}
			<div ref={totalRef} className={points.length ? classes.total : ''}>
				{sum(points)}
			</div>
		</div>
	)
}
