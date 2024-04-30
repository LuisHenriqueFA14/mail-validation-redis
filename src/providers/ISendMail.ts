interface ISendMail {
	send(to: string, subject: string, text: string): Promise<any>;
}

export type { ISendMail };
