import { ApiError } from "../../helpers/ApiError";
import type { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import type { IService } from "../IService";

interface IIsValidatedDTO {
	id: string;
}

class IsValidatedService implements IService {
	constructor(
		private usersRepository: IUsersRepository = new UsersRepository(),
	) {}

	async execute(props: IIsValidatedDTO): Promise<any> {
		const { id } = props;

		const user = await this.usersRepository.findById(id);

		if (!user) throw new ApiError("User not found.", "Bad Request");

		if (!user.validated)
			throw new ApiError("User not validated.", "Bad Request");
	}
}

export { IsValidatedService };
