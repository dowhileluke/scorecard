import { Fragment, useEffect, useMemo, useRef } from 'react'
import { sum } from '@dowhileluke/fns'
import { signed } from '../functions/signed'
import { toRunningTotals } from '../functions/to-running-totals'
import { Editable } from './editable'
import classes from './score-table.module.css'

type ScoreTableProps = {
	points: number[];
	onClick?: (index: number) => void;
	showRunning?: boolean;
}

export function ScoreTable({ points, onClick, showRunning }: ScoreTableProps) {
	const sumRef = useRef<HTMLDivElement>(null)
	const runningTotals = useMemo(() => showRunning ? toRunningTotals(points) : [], [points, showRunning])
	const lastIndex = points.length - 1

	useEffect(() => {
		sumRef.current?.scrollIntoView(false)
	}, [points])

	const editablePoints = points.map((p, i) => (
		<Fragment key={i}>
			<Editable onClick={() => onClick?.(i)}>
				{signed(p)}
			</Editable>
			{showRunning && i < lastIndex && (
				<div className={classes.sum}>
					{runningTotals[i]}
				</div>
			)}
		</Fragment>
	))

	return (
		<div className={classes.list}>
			{editablePoints}
			{points.length > 0 ? (
				<div ref={sumRef} className={classes.sum}>
					{sum(points)}
				</div>
			) : (
				<div>0</div>
			)}
		</div>
	)
}
