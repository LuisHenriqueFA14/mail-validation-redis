import { ApiError } from "../../helpers/ApiError";
import type { ISendMail } from "../../providers/ISendMail";
import { SendMail } from "../../providers/SendMail";
import type { IService } from "../IService";

interface ISendValidationMailDTO {
	email: string;
	code: number;
}

class SendValidationMail implements IService {
	constructor(private sendMail: ISendMail = new SendMail()) {}

	async execute(props: ISendValidationMailDTO): Promise<any> {
		const { email, code } = props;

		if (!email) throw new ApiError("Missing params.", "Bad Request");

		await this.sendMail.send(
			email,
			"Validate your account",
			`Validation code: ${code}`,
		);
	}
}

export { SendValidationMail };
