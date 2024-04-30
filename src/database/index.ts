import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

const database = new PrismaClient();
const redis = createClient()
	.on("error", (err) => console.log("Redis Client Error", err))
	.connect();

export { database, redis };
