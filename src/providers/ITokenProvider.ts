interface ITokenProvider {
	generateToken(id: string): string;
	getIdFromToken(token: string): string | null;
}

export type { ITokenProvider };
