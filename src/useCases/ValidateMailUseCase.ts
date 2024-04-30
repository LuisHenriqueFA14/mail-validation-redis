import { ApiError } from "../helpers/ApiError";
import type { IUsersRepository } from "../repositories/IUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import type { IService } from "../services/IService";
import { SendMailValidatedMailService } from "../services/implementations/SendMailValidatedMailService";
import { ValidateMailService } from "../services/implementations/ValidateMailService";
import type { IValidateMailDTO } from "./IValidateMailDTO";

class ValidateMailUseCase {
	constructor(
		private usersRepository: IUsersRepository = new UsersRepository(),
		private validateMailService: IService = new ValidateMailService(),
		private sendMailValidatedMailService: IService = new SendMailValidatedMailService(),
	) {}

	async execute(props: IValidateMailDTO) {
		const { id, code } = props;

		if (!id || !code) throw new ApiError("Missing params.", "Bad Request");

		const user = await this.usersRepository.findById(id);

		if (!user) throw new Error("User not found.");

		await this.validateMailService.execute({
			id,
			code,
		});

		await this.sendMailValidatedMailService.execute({ email: user.email });
	}
}

export { ValidateMailUseCase };
