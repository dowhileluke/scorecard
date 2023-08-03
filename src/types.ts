export type Override<Base, Edits, OmittedKeys extends keyof Base = never> = Omit<Base, OmittedKeys | keyof Edits> & Edits

export type ClassNamed = {
	className?: string;
}

export type AppSettings = {
	p1: string;
	p2: string;
	isInverted: boolean;
}

export type AppState = {
	p1: number[];
	p2: number[];
}
