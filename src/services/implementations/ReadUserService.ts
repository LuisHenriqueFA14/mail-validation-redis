import { ApiError } from "../../helpers/ApiError";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import type { IService } from "../IService";

interface IReadUserDTO {
	id: string;
}

class ReadUserService implements IService {
	constructor(
		private usersRepository: IUsersRepository = new UsersRepository(),
	) {}

	async execute(props: IReadUserDTO): Promise<any> {
		const { id } = props;

		const user = await this.usersRepository.findById(id);

		if (!user) throw new ApiError("User not found.", "Bad Request");

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
		};
	}
}

export { ReadUserService };
