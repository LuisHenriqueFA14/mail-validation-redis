interface IEncryptPassword {
	encrypt(password: string): Promise<string>;
	compare(password: string, hashedPassword: string): Promise<boolean>;
}

export type { IEncryptPassword };
