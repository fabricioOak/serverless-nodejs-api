const serverless = require("serverless-http");
const express = require("express");
const { neon, neonConfig } = require("@neondatabase/serverless");
const app = express();

async function dbClient() {
	neonConfig.fetchConnectionCache = true;
	return (sql = neon(process.env.DATABASE_URL));
}

app.get("/", async (req, res, next) => {
	const db = await dbClient();
	const results = await db`select now()`;
	return res.status(200).json({
		message: "Hello from root!",
		DATABASE_URL: process.env.DATABASE_URL,
		results,
	});
});

app.get("/path", (req, res, next) => {
	return res.status(200).json({
		message: "Hello from path!",
	});
});

app.use((req, res, next) => {
	return res.status(404).json({
		error: "Not Found",
	});
});

module.exports.handler = serverless(app);
