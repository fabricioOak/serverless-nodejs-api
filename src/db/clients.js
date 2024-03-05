const { neon } = require("@neondatabase/serverless");
const { getDatabaseUrl } = require("../lib/secrets");

async function getDbClient() {
	const databaseUrl = await getDatabaseUrl();
	return (sql = neon(databaseUrl));
}

module.exports = { getDbClient };
