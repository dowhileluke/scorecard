export type Override<Base, Edits, OmittedKeys extends keyof Base = never> = Omit<Base, OmittedKeys | keyof Edits> & Edits

export type ClassNamed = {
	className?: string;
}

export type Player = {
	id: number;
	name: string;
}

export type ScoreState = Record<number, number[]>

export type AppSettings = {
	p1: string;
	p2: string;
	isInverted: boolean;
}

export type AppState = {
	p1: number[];
	p2: number[];
}

export type CallMode = 'Knock' | 'Gin'

export type ModalState = {
	p1: number | null;
	p2: number | null;
	mode: CallMode | null;
	caller: null | keyof AppState;
}
