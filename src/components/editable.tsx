import { Edit2 } from 'react-feather'
import { DivProps } from '../types'
import { concat } from '../functions/concat'
import { Fusion } from './fusion'
import classes from './editable.module.css'

const PENCIL = (
	<div className={classes.icon}>
		<Edit2 size="0.8em" />
	</div>
)

const PRIMITIVES = ['string', 'number']

export function Editable({ className, children, ...props }: DivProps) {
	const isPrimitive = PRIMITIVES.some(p => p === typeof children)

	return (
		<Fusion className={concat(classes.editable, className)} {...props}>
			{isPrimitive ? (<div>{children}</div>) : children}
			{PENCIL}
		</Fusion>
	)
}
