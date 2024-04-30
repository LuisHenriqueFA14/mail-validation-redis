class Validation {
	user_id: string;
	code: number;

	constructor(props: Omit<Validation, "code">) {
		Object.assign(this, props);

		if (!this.code) {
			this.code = Math.floor(Math.random() * 1000000);
		}
	}
}

export { Validation };
