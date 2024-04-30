import type { Validation } from "../entities/Validation";

interface IValidationRepository {
	setCode(validation: Validation): Promise<void>;
	getCode(user_id: string): Promise<Validation | null>;
	deleteCode(id: string): Promise<void>;
}

export type { IValidationRepository };
