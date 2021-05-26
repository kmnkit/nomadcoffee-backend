require("dotenv").config();
import client from "./client";
import * as express from "express";
import * as logger from "morgan";
import schema from "./schema";
import { ApolloServer } from "apollo-server-express";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      client,
    };
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on localhost:${PORT} ✅`);
});
