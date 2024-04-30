import type { Request, Response } from "express";
import { IsValidatedUseCase } from "../useCases/IsValidatedUseCase";

class IsValidatedController {
	constructor(
		private isValidatedUseCase: IsValidatedUseCase = new IsValidatedUseCase(),
	) {}

	async handle(request: Request, response: Response) {
		const { userId } = request;

		await this.isValidatedUseCase.execute({
			id: userId,
		});

		return response.status(200).send({
			message: "User validated",
		});
	}
}

export { IsValidatedController };
