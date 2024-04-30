import { ApiError } from "../../helpers/ApiError";
import { isValidEmail } from "../../helpers/validators";
import { EncryptPassword } from "../../providers/EncryptPassword";
import type { IEncryptPassword } from "../../providers/IEncryptPassword";
import type { ITokenProvider } from "../../providers/ITokenProvider";
import { TokenProvider } from "../../providers/TokenProvider";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import type { IService } from "../IService";

interface ILoginDTO {
	email: string;
	password: string;
}

class LoginService implements IService {
	constructor(
		private usersRepository: IUsersRepository = new UsersRepository(),
		private encryptPassword: IEncryptPassword = new EncryptPassword(),
		private tokenProvider: ITokenProvider = new TokenProvider(),
	) {}

	async execute(props: ILoginDTO): Promise<any> {
		const { email, password } = props;

		if (!isValidEmail(email))
			throw new ApiError("Invalid email", "Bad Request");

		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new ApiError("User not found", "Bad Request");

		if (!(await this.encryptPassword.compare(password, user.password)))
			throw new ApiError("Invalid password", "Bad Request");

		const token = this.tokenProvider.generateToken(user.id);

		return {
			token,
		};
	}
}

export { LoginService };
