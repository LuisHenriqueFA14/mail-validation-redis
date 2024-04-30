import { ApiError } from "../../helpers/ApiError";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import type { IValidationRepository } from "../../repositories/IValidationRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { ValidationRepository } from "../../repositories/ValidationRepository";
import type { IService } from "../IService";

interface IValidateMailDTO {
	id: string;
	code: number;
}

class ValidateMailService implements IService {
	constructor(
		private verificationsRepository: IValidationRepository = new ValidationRepository(),
		private usersRepository: IUsersRepository = new UsersRepository(),
	) {}

	async execute(props: IValidateMailDTO): Promise<any> {
		const { id, code } = props;

		if (!id || !code) throw new ApiError("Missing params.", "Bad Request");

		const user = await this.usersRepository.findById(id);

		if (!user) throw new ApiError("User not found.", "Bad Request");
		if (user.validated)
			throw new ApiError("Mail already validated.", "Bad Request");

		const validation = await this.verificationsRepository.getCode(id);

		if (!validation) throw new ApiError("Validation not found.", "Bad Request");
		if (validation.code !== code)
			throw new ApiError("Invalid code.", "Bad Request");

		await this.verificationsRepository.deleteCode(id);

		user.validated = true;

		await this.usersRepository.update(user);
	}
}

export { ValidateMailService };
