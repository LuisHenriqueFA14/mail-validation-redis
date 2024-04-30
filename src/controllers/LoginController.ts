import type { Request, Response } from "express";
import { LoginUseCase } from "../useCases/LoginUseCase";

class LoginController {
	constructor(private loginUseCase: LoginUseCase = new LoginUseCase()) {}

	async handle(request: Request, response: Response) {
		const { email, password } = request.body;

		const token = await this.loginUseCase.execute({
			email,
			password,
		});

		return response.status(200).send({
			message: "User logged successfully",
			token,
		});
	}
}

export { LoginController };
