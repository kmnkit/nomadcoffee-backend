require("dotenv").config();
import client from "./client";
import * as express from "express";
import { typeDefs, resolvers } from "./schema";
import { ApolloServer } from "apollo-server-express";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    return {
      client,
    };
  },
});

const app = express();
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on localhost:${PORT} ✅`);
});
