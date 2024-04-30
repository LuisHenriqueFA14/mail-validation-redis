import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/ApiError";
import { TokenProvider } from "../providers/TokenProvider";

const tokenProvider = new TokenProvider();

function ensureAuthenticatedMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction,
) {
	const token = req.headers.authorization;

	if (!token) throw new ApiError("Not authenticated.", "Unauthorized");

	const id = tokenProvider.getIdFromToken(token.split(" ")[1]);

	if (!id) throw new ApiError("Not authenticated.", "Unauthorized");

	req.userId = id;

	return next();
}

export { ensureAuthenticatedMiddleware };
