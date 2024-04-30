import { Validation } from "../../entities/Validation";
import { ApiError } from "../../helpers/ApiError";
import type { IValidationRepository } from "../../repositories/IValidationRepository";
import { ValidationRepository } from "../../repositories/ValidationRepository";
import type { IService } from "../IService";

interface ICreateValidationDTO {
	user_id: string;
}

class CreateValidationService implements IService {
	constructor(
		private verificationsRepository: IValidationRepository = new ValidationRepository(),
	) {}

	async execute(props: ICreateValidationDTO): Promise<any> {
		const { user_id } = props;

		if (!user_id) throw new ApiError("Missing params.", "Bad Request");

		const validationAlreadyExists =
			await this.verificationsRepository.getCode(user_id);

		if (validationAlreadyExists)
			throw new ApiError("Validation already exists.", "Bad Request");

		const validation: Validation = new Validation({
			user_id,
		});

		await this.verificationsRepository.setCode(validation);

		return validation;
	}
}

export { CreateValidationService };
