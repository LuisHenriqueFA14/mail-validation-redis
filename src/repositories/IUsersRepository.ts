import type { User } from "../entities/User";

interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	create(user: User): Promise<void>;
	update(user: User): Promise<void>;
	delete(id: string): Promise<void>;
}

export type { IUsersRepository };
