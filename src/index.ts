require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";

const server = new ApolloServer({ schema });
const PORT = process.env.PORT;

const { url } = await startStandaloneServer(server, {
	context: async () => ({}),
	listen: { port: +PORT },
});

console.log(`🚀  Server ready at: ${url}`);
