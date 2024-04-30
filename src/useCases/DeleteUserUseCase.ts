import type { IService } from "../services/IService";
import { DeleteUserService } from "../services/implementations/DeleteUserService";
import type { IDeleteUserDTO } from "./IDeleteUserDTO";

class DeleteUserUseCase {
	constructor(private deleteUserServiec: IService = new DeleteUserService()) {}

	async execute(props: IDeleteUserDTO) {
		const { id, password } = props;

		await this.deleteUserServiec.execute({
			id,
			password,
		});
	}
}

export { DeleteUserUseCase };
