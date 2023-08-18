import { ComponentPropsWithoutRef } from 'react'

// react subtypes
export type DivProps = ComponentPropsWithoutRef<'div'>
export type ClassNamed = Pick<DivProps, 'className'>

// util
export type Override<Base, Edits, OmittedKeys extends keyof Base = never> = Omit<Base, OmittedKeys | keyof Edits> & Edits

// state types
export type PlayerId = number
export type Player = {
	id: PlayerId;
	name: string;
}
export type ScoreState = Record<PlayerId, number[]>
export type FormState = Record<PlayerId, number | null | undefined>
export type Config = {
	submitNulls: boolean;
	persistScores: boolean;
}

export type GameState = {
	players: Player[];
	scores: ScoreState;
	config: Config;
}

export type ModalState =
	| { mode: 'IDLE' }
	| { mode: 'ADD' }
	| { mode: 'EDIT', player: Player }
	| { mode: 'AMEND', player: Player, index: number }
	| { mode: 'CONFIG' }
