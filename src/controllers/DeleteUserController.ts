import type { Request, Response } from "express";
import { DeleteUserUseCase } from "../useCases/DeleteUserUseCase";

class DeleteUserController {
	constructor(
		private deleteUserUseCase: DeleteUserUseCase = new DeleteUserUseCase(),
	) {}

	async handle(request: Request, response: Response) {
		const { password } = request.body;
		const { userId } = request;

		await this.deleteUserUseCase.execute({
			id: userId,
			password,
		});

		return response.status(200).send({
			message: "User deleted successfully",
		});
	}
}

export { DeleteUserController };
