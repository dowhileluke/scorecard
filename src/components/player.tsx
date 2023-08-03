import { CSSProperties } from 'react'
import classes from './player.module.css'

type PlayerProps = {
	name: string;
	scores?: number[];
	isFirst?: boolean;
}

const FIRST_STYLE: CSSProperties = {
	marginLeft: 'auto',
}

const SECOND_STYLE: CSSProperties = {
	marginRight: 'auto'
}

export function Player({ name, scores, isFirst = false }: PlayerProps) {
	return (
		<div className={classes.container} style={isFirst ? FIRST_STYLE : SECOND_STYLE}>
			<div className={classes.label}>
				{name}
			</div>
		</div>
	)
}
