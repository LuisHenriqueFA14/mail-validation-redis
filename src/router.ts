import { type Request, type Response, Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { IsValidatedController } from "./controllers/IsValidatedController";
import { LoginController } from "./controllers/LoginController";
import { ReadUserController } from "./controllers/ReadUserController";
import { ValidateMailController } from "./controllers/ValidateMailController";
import { ensureAuthenticatedMiddleware } from "./middlewares/ensureAuthenticatedMiddleware";

const router = Router();

const createUserController = new CreateUserController();
const loginController = new LoginController();
const readUserController = new ReadUserController();
const deleteUserController = new DeleteUserController();
const validateMailController = new ValidateMailController();
const isValidatedController = new IsValidatedController();

router.post("/api/user", (req: Request, res: Response) =>
	createUserController.handle(req, res),
);

router.post("/api/login", (req: Request, res: Response) =>
	loginController.handle(req, res),
);

router.get(
	"/api/user",
	ensureAuthenticatedMiddleware,
	(req: Request, res: Response) => readUserController.handle(req, res),
);

router.delete(
	"/api/user",
	ensureAuthenticatedMiddleware,
	(req: Request, res: Response) => deleteUserController.handle(req, res),
);

router.post(
	"/api/user/validate",
	ensureAuthenticatedMiddleware,
	(req: Request, res: Response) => validateMailController.handle(req, res),
);

router.get(
	"/api/user/isValidated",
	ensureAuthenticatedMiddleware,
	(req: Request, res: Response) => isValidatedController.handle(req, res),
);

export { router };
