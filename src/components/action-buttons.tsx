import { UserPlus, Settings } from 'react-feather'
import { Button } from './primitives/interactive'
import classes from './action-buttons.module.css'

type ActionButtonsProps = {
	onAdd: () => void;
	onConfig: () => void;
}

export function ActionButtons({ onAdd, onConfig }: ActionButtonsProps) {
	return (
		// <div className={classes.act}>
		<>
			<Button onClick={onConfig} tabIndex={3}>
				<Settings size="1.25em" />
			</Button>
			<Button onClick={onAdd} tabIndex={2}>
				<UserPlus size="1.25em" />
			</Button>
		</>
		// </div>
	)
}
