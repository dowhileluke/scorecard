import { FormEvent, useState } from 'react'
import { sum } from '@dowhileluke/fns';
import classes from './score-form.module.css'
import { FormState, Player } from '../types'

type ScoreFormProps = {
	players: Player[];
	onSubmit?: (value: FormState) => void;
}

const EMPTY_STATE: FormState = {}

export function ScoreForm({ players, onSubmit }: ScoreFormProps) {
	const [state, setState] = useState(EMPTY_STATE)
	const total = sum(players, p => state[p.id] ?? 0)

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		onSubmit?.(state)

		setState(EMPTY_STATE)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>

		</form>
	)
}
