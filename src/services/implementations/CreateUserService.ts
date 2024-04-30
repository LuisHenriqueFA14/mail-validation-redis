import { User } from "../../entities/User";
import { ApiError } from "../../helpers/ApiError";
import {
	isValidEmail,
	isValidName,
	isValidPassword,
} from "../../helpers/validators";
import { EncryptPassword } from "../../providers/EncryptPassword";
import type { IEncryptPassword } from "../../providers/IEncryptPassword";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import type { IService } from "../IService";

interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
}

class CreateUserService implements IService {
	constructor(
		private usersRepository: IUsersRepository = new UsersRepository(),
		private encryptPassword: IEncryptPassword = new EncryptPassword(),
	) {}
	async execute(props: ICreateUserDTO): Promise<any> {
		const { name, email, password } = props;

		if (!isValidName(name)) throw new ApiError("Invalid name", "Bad Request");

		if (!isValidEmail(email))
			throw new ApiError("Invalid email", "Bad Request");

		if (!isValidPassword(password))
			throw new ApiError("Invalid password", "Bad Request");

		const emailAlreadyExists = await this.usersRepository.findByEmail(email);

		if (emailAlreadyExists)
			throw new ApiError("Email already in use.", "Bad Request");

		const hashedPassword = await this.encryptPassword.encrypt(password);

		const user: User = new User({
			name,
			email,
			password: hashedPassword,
		});

		await this.usersRepository.create(user);

		return {
			id: user.id,
		};
	}
}

export { CreateUserService };
