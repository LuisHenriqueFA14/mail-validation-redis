import nodemailer from "nodemailer";
import type { ISendMail } from "./ISendMail";

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: +(process.env.MAIL_PORT as string),
	secure: false,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

class SendMail implements ISendMail {
	async send(to: string, subject: string, text: string): Promise<any> {
		const mailOptions = {
			from: process.env.MAIL_USER,
			to,
			subject,
			text,
		};

		return await transporter.sendMail(mailOptions);
	}
}

export { SendMail };
