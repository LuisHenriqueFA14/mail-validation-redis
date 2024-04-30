import type { IService } from "../services/IService";
import { CreateUserService } from "../services/implementations/CreateUserService";
import { CreateValidationService } from "../services/implementations/CreateValidationService";
import { SendValidationMail } from "../services/implementations/SendValidationMail";
import type { ICreateUserDTO } from "./ICreateUserDTO";

class CreateUserUseCase {
	constructor(
		private createUserService: IService = new CreateUserService(),
		private createValidationService: IService = new CreateValidationService(),
		private sendValidationMail: IService = new SendValidationMail(),
	) {}

	async execute(props: ICreateUserDTO) {
		const { name, email, password } = props;

		const { id } = await this.createUserService.execute({
			name,
			email,
			password,
		});

		const { code } = await this.createValidationService.execute({
			user_id: id,
		});

		await this.sendValidationMail.execute({
			email,
			code,
		});
	}
}

export { CreateUserUseCase };
