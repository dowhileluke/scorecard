export type Override<Base, Edits, OmittedKeys extends keyof Base = never> = Omit<Base, OmittedKeys | keyof Edits> & Edits

export type ClassNamed = {
	className?: string;
}

export type Player = {
	id: number;
	name: string;
}
