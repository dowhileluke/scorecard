import { Edit2 } from 'react-feather';
import classes from './editable.module.css'
import { ReactNode } from 'react';
import { Grid } from './grid';
import { ClassNamed } from '../types';
import { merge } from '../functions/merge';

type EditableProps = {
	children: ReactNode;
	onEdit?: () => void;
	pencilSize?: string | number;
}

export function Editable({
	onEdit, pencilSize = 'var(--default-pencil-size)', children, className
}: EditableProps & ClassNamed) {
	return (
		<Grid
			templateCols={`${pencilSize} auto ${pencilSize}`}
			gap="0.25rem"
			centered
			inline
			className={merge(classes.container, className)}
			onClick={onEdit}
		>
			<div className={classes.mid}>{children}</div>
			<Edit2 size={pencilSize} />
		</Grid>
	)
}
