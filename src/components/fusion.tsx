import { DivProps } from '../types'
import { concat } from '../functions/concat'
import classes from './fusion.module.css'

export function Fusion({ className, ...props }: DivProps) {
	return (
		<div className={concat(classes.fusion, className)} {...props} />
	)
}
