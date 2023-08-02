export type Override<Base, Edits, OmittedKeys extends keyof Base = never> = Omit<Base, OmittedKeys | keyof Edits> & Edits

export type Settings = {
	p1: string;
	p2: string;
	isInverted: boolean;
}
