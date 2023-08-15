import { ComponentPropsWithoutRef, ReactNode } from 'react'
import classes from './stack.module.css'
import { merge } from '../functions/merge';

type StackProps = {
	over?: ReactNode;
}

export function Stack({
	over, className, children, ...props
}: StackProps & ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={merge(classes.stack, className)} {...props}>
			<div className={classes.under}>{children}</div>
			<div className={classes.over}>{over}</div>
		</div>
	)
}
