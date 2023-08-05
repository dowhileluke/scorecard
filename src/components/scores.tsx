import { Editable } from './editable';
import classes from './scores.module.css'

type ScoresProps = {
	values: number[];
	onEdit?: (index: number) => void;
}

export function Scores({ values, onEdit, }: ScoresProps) {

	return (
		<div className={classes.container}>
			<div className={classes.item}>0</div>
			{values.map((n, i) => (
				<div key={i} className={classes.item}>
					<Editable onEdit={() => onEdit?.(i)}>
						{n}
					</Editable>
				</div>
			))}
		</div>
	)
}
