import { ApiError } from "../../helpers/ApiError";
import type { ISendMail } from "../../providers/ISendMail";
import { SendMail } from "../../providers/SendMail";
import type { IService } from "../IService";

interface ISendMailValidatedMailDTO {
	email: string;
}

class SendMailValidatedMailService implements IService {
	constructor(private sendMail: ISendMail = new SendMail()) {}

	async execute(props: ISendMailValidatedMailDTO): Promise<any> {
		const { email } = props;

		if (!email) throw new ApiError("Missing params.", "Bad Request");

		await this.sendMail.send(
			email,
			"Account validated",
			"Thanks for validating your account",
		);
	}
}

export { SendMailValidatedMailService };
