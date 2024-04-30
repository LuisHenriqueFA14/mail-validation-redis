import { z } from "zod";

const emailValidator = z.string().email();
const passwordValidator = z.string().min(8).max(25);
const nameValidator = z.string().min(3).max(40);

function isValidEmail(email: string): boolean {
	try {
		return emailValidator.parse(email) === email;
	} catch {
		return false;
	}
}

function isValidPassword(password: string): boolean {
	try {
		return passwordValidator.parse(password) === password;
	} catch {
		return false;
	}
}

function isValidName(name: string): boolean {
	try {
		return nameValidator.parse(name) === name;
	} catch {
		return false;
	}
}

export { isValidEmail, isValidPassword, isValidName };
