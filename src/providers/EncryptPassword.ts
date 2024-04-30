import bcrypt from "bcrypt";
import type { IEncryptPassword } from "./IEncryptPassword";

class EncryptPassword implements IEncryptPassword {
	async encrypt(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	async compare(password: string, hashedPassword: string): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}
}

export { EncryptPassword };
