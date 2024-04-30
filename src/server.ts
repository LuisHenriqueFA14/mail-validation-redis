import dotenv from "dotenv";
import express from "express";
import "express-async-errors";

import { handleErrorMiddleware } from "./middlewares/handleErrorMiddleware";
import { router } from "./router";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(router);
app.use(handleErrorMiddleware);

app.listen(PORT, () => {
	console.log(`🚀 Server started on port ${PORT}!`);
});
