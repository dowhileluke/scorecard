import { FormEvent, PropsWithChildren } from 'react'
import { useForm } from '../hooks/use-form'
import { FormState, Player } from '../types'
import { IntegerInput } from './integer-input'
import classes from './points-form.module.css'
import { sumAndDelta } from '../functions/sum-and-delta'
import { Button } from './primitives/interactive'

type FormProps = {
	players: Player[];
	onSubmit: (values: FormState) => void;
	placeholder?: string;
}

export function PointsForm({ players, onSubmit, placeholder, children }: PropsWithChildren<FormProps>) {
	const [values, setValue, resetValues] = useForm(players)
	const [sum, delta] = sumAndDelta(players, values)

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		onSubmit(values)
		resetValues()
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<div className="col-group">
				{players.map(p => (
					<label key={p.id}>
						<div className="label-text trim">{p.name}</div>
						<IntegerInput
							value={values[p.id] ?? null}
							onChange={n => setValue(p.id, n)}
							placeholder={placeholder}
						/>
					</label>
				))}
			</div>
			<div className="col-group">
				{children}
				<Button type="submit" disabled={!delta}>
					Submit {sum} {delta !== Math.abs(sum) && (<>(&plusmn;{delta})</>)} {delta === 1 ? 'point' : 'points'}
				</Button>
			</div>
		</form>
	)
}
