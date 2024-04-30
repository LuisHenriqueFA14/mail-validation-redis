import type { Request, Response } from "express";
import { ReadUserUseCase } from "../useCases/ReadUserUseCase";

class ReadUserController {
	constructor(
		private readUserUseCase: ReadUserUseCase = new ReadUserUseCase(),
	) {}

	async handle(request: Request, response: Response) {
		const { userId } = request;

		const { id, name, email, role, coins, created_at } =
			await this.readUserUseCase.execute({
				id: userId,
			});

		return response.status(200).send({
			id,
			name,
			email,
			role,
			coins,
			created_at,
		});
	}
}

export { ReadUserController };
