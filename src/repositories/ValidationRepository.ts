import { redis } from "../database";
import { Validation } from "../entities/Validation";
import type { IValidationRepository } from "./IValidationRepository";

class ValidationRepository implements IValidationRepository {
	async setCode(validation: Validation): Promise<void> {
		await (await redis).set(validation.user_id, validation.code);
	}

	async getCode(user_id: string): Promise<Validation | null> {
		const code = await (await redis).get(user_id);

		if (!code) return null;

		const validation = new Validation({ user_id });

		validation.code = Number(code);

		return validation;
	}

	async deleteCode(id: string): Promise<void> {
		await (await redis).del(id);
	}
}

export { ValidationRepository };
