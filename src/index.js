const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require("./db/clients");

const app = express();

app.get("/", async (req, res, next) => {
	const db = await getDbClient();
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
