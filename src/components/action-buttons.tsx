import { Settings, Users } from 'react-feather'
import { Button } from './primitives/interactive'

type ActionButtonsProps = {
	onConfig: () => void;
	onManage: () => void;
}

export function ActionButtons({ onConfig, onManage }: ActionButtonsProps) {
	return (
		// <div className={classes.act}>
		<>
			<Button onClick={onConfig} tabIndex={3}>
				<Settings size="1.25em" />
			</Button>
			<Button onClick={onManage} tabIndex={2}>
				<Users size="1.25em" />
			</Button>
		</>
		// </div>
	)
}
