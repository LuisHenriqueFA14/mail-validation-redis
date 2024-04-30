import jsonwebtoken from "jsonwebtoken";
import type { ITokenProvider } from "./ITokenProvider";

interface IJWTPayload {
	id: string;
}

class TokenProvider implements ITokenProvider {
	generateToken(id: string): string {
		return jsonwebtoken.sign({ id }, process.env.JWT_SECRET as string, {
			expiresIn: "30d",
		});
	}

	getIdFromToken(token: string): string | null {
		try {
			return (
				jsonwebtoken.verify(
					token,
					process.env.JWT_SECRET as string,
				) as IJWTPayload
			).id;
		} catch {
			return null;
		}
	}
}

export { TokenProvider };
