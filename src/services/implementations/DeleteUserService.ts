import { ApiError } from "../../helpers/ApiError";
import { EncryptPassword } from "../../providers/EncryptPassword";
import type { IEncryptPassword } from "../../providers/IEncryptPassword";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import type { IService } from "../IService";

interface IUpdateUserService {
	id: string;
	password: string;
}

class DeleteUserService implements IService {
	constructor(
		private usersRepository: IUsersRepository = new UsersRepository(),
		private encryptPassword: IEncryptPassword = new EncryptPassword(),
	) {}

	async execute(props: IUpdateUserService): Promise<any> {
		const { id, password } = props;

		if (!password) throw new ApiError("Missing params.", "Bad Request");

		const user = await this.usersRepository.findById(id);

		if (!user) throw new ApiError("User not found.", "Bad Request");

		if (!(await this.encryptPassword.compare(password, user.password)))
			throw new ApiError("Invalid password", "Bad Request");

		await this.usersRepository.delete(id);
	}
}

export { DeleteUserService };
