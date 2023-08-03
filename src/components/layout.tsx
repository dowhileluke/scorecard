import { ReactNode } from 'react'
import classes from './layout.module.css'
import { ClassNamed } from '../types';
import { merge } from '../functions/merge';

type LayoutProps = {
	top: ReactNode;
	bot: ReactNode;
}

const EMPTY_NODE = (<div />)

export function Layout({ top, bot, className }: LayoutProps & ClassNamed) {
	return (
		<div className={merge(classes.layout, className)}>
			{top ?? EMPTY_NODE}
			{bot ?? EMPTY_NODE}
		</div>
	)
}
