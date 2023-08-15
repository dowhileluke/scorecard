import { FormEvent, PropsWithChildren } from 'react'
import { useForm } from '../hooks/use-form'
import { FormState, Player } from '../types'
import { IntegerInput } from './integer-input'
import classes from './form.module.css'
import { sumAndDelta } from '../functions/sum-and-delta'

type FormProps = {
	players: Player[];
	onSubmit: (values: FormState) => void;
}

export function Form({ players, onSubmit, children }: PropsWithChildren<FormProps>) {
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
						<div className="fancy trim">{p.name}</div>
						<IntegerInput
							value={values[p.id] ?? null}
							onChange={n => setValue(p.id, n)}
						/>
					</label>
				))}
			</div>
			<div className="col-group">
				{children}
				<button type="submit" disabled={!delta}>
					Submit {sum} {delta !== Math.abs(sum) && (<>(&plusmn;{delta})</>)} {delta === 1 ? 'point' : 'points'}
				</button>
			</div>
		</form>
	)
}
