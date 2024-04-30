import { database } from "../database";
import type { User } from "../entities/User";
import type { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
	async findByEmail(email: string): Promise<User | null> {
		return await database.user.findFirst({
			where: {
				email,
			},
		});
	}

	async findById(id: string): Promise<User | null> {
		return await database.user.findFirst({
			where: {
				id,
			},
		});
	}

	async create(user: User): Promise<void> {
		await database.user.create({
			data: user,
		});
	}

	async update(user: User): Promise<void> {
		await database.user.update({
			where: {
				id: user.id,
			},
			data: user,
		});
	}

	async delete(id: string): Promise<void> {
		await database.user.delete({
			where: {
				id,
			},
		});
	}
}

export { UsersRepository };
