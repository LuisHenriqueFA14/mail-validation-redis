import { statusToCode } from "./statusToCode";

class ApiError extends Error {
	status: number;

	constructor(message: string, status: string) {
		super(message);

		this.status = statusToCode(status);
	}
}

export { ApiError };
