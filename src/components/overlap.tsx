import { ComponentPropsWithoutRef, ReactNode } from 'react'
import classes from './overlap.module.css'
import { merge } from '../functions/merge';

type OverlapProps = {
	over?: ReactNode;
}

export function Overlap({
	over, className, children, ...props
}: OverlapProps & ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={merge(classes.container, className)} {...props}>
			<div className={classes.under}>{children}</div>
			<div className={classes.over}>{over}</div>
		</div>
	)
}
