import type { IService } from "../services/IService";
import { IsValidatedService } from "../services/implementations/IsValidatedService";
import type { IIsValidatedDTO } from "./IIsValidatedDTO";

class IsValidatedUseCase {
	constructor(
		private isValidatedService: IService = new IsValidatedService(),
	) {}

	async execute(props: IIsValidatedDTO) {
		const { id } = props;

		return await this.isValidatedService.execute({
			id,
		});
	}
}

export { IsValidatedUseCase };
