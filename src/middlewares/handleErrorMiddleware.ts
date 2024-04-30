import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../helpers/ApiError";

function handleErrorMiddleware(
	err: ApiError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	if (err.status)
		return res.status(err.status).json({
			message: err.message,
		});

	return res.status(500).json({
		message: err.message,
	});

	//return res.status(500).json({
	//message: "Internal Server Error",
	//});
}

export { handleErrorMiddleware };
