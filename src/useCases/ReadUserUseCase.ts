import type { IService } from "../services/IService";
import { ReadUserService } from "../services/implementations/ReadUserService";
import type { IReadUserDTO } from "./IReadUserDTO";

class ReadUserUseCase {
	constructor(private readUserService: IService = new ReadUserService()) {}

	async execute(props: IReadUserDTO) {
		const { id } = props;

		return await this.readUserService.execute({
			id,
		});
	}
}

export { ReadUserUseCase };
