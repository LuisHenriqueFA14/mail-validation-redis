import type { Request, Response } from "express";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

class CreateUserController {
	constructor(
		private createUserUseCase: CreateUserUseCase = new CreateUserUseCase(),
	) {}

	async handle(request: Request, response: Response) {
		const { name, email, password } = request.body;

		await this.createUserUseCase.execute({
			name,
			email,
			password,
		});

		return response.status(201).send({
			message: "User created successfully",
		});
	}
}

export { CreateUserController };
