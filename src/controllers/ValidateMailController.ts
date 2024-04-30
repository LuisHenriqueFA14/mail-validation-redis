import type { Request, Response } from "express";
import { ValidateMailUseCase } from "../useCases/ValidateMailUseCase";

class ValidateMailController {
	constructor(
		private validateMailUseCase: ValidateMailUseCase = new ValidateMailUseCase(),
	) {}

	async handle(request: Request, response: Response) {
		const { code } = request.body;
		const { userId } = request;

		const token = await this.validateMailUseCase.execute({
			id: userId,
			code,
		});

		return response.status(200).send({
			message: "Mail validated successfully",
		});
	}
}

export { ValidateMailController };
