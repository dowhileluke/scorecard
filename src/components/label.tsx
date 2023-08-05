import classes from './label.module.css'
import { Editable } from './editable';

type LabelProps = {
	children: string;
	onEdit?: () => void;
}

export function Label({ onEdit, children }: LabelProps) {
	return (
		<Editable onEdit={onEdit} pencilSize="0.75rem" className={classes.label}>
			{children}
		</Editable>
	)
}
