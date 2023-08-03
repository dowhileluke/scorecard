import { PropsWithChildren } from 'react'
import classes from './viewport.module.css'
import { merge } from '../functions/merge'
import { ClassNamed } from '../types'

export function Viewport({ className, children }: PropsWithChildren<ClassNamed>) {
	return (
		<div className={merge(classes.viewport, className)}>
			{children}
		</div>
	)
}
