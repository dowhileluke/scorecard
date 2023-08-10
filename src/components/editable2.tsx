import { ReactNode } from 'react'
import { ClassNamed } from '../types';
import { Edit2 } from 'react-feather';
import { Overlap } from './overlap';

type EditableProps = {
	value: ReactNode;
	onClick?: () => void;
}

export function Editable2({ value, onClick, className }: EditableProps & ClassNamed) {
	return (
		<Overlap
			over={<Edit2 size="0.8em" />}
			onClick={onClick}
			className={className}
		>
			{value}
		</Overlap>
	)
}
