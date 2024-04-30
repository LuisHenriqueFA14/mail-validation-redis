import type { IService } from "../services/IService";
import { LoginService } from "../services/implementations/LoginService";
import type { ILoginDTO } from "./ILoginDTO";

class LoginUseCase {
	constructor(private loginService: IService = new LoginService()) {}

	async execute(props: ILoginDTO) {
		const { email, password } = props;

		const { token } = await this.loginService.execute({
			email,
			password,
		});

		return {
			token,
		};
	}
}

export { LoginUseCase };
