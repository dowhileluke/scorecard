import { ReactNode } from 'react';
import { signed } from '../functions/signed';
import classes from './score-table.module.css'
import { Editable2 } from './editable2';
import { sum } from '@dowhileluke/fns';

type ScoreTableProps = {
	scores: number[];
	onClick?: (index: number) => void;
}

export function ScoreTable({ scores, onClick }: ScoreTableProps) {
	let total = sum(scores)

	return (
		<div className={classes.container}>
			{scores.map((s, index) => (
				<div key={index}>
					<Editable2
						value={signed(s)}
						onClick={() => onClick?.(index)}
					/>
				</div>
			))}
			<div className={scores.length ? classes.total : ''}>{total}</div>
		</div>
	)
}
