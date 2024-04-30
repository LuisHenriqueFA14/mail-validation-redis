import { v4 as uuid } from "uuid";

class User {
	id: string;
	name: string;
	email: string;
	password: string;
	validated: boolean;
	created_at: Date;

	constructor(props: Omit<User, "id" | "validated" | "created_at">) {
		Object.assign(this, props);

		if (!this.id) {
			this.id = uuid();
			this.validated = false;
			this.created_at = new Date();
		}
	}
}

export { User };
