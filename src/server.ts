require("dotenv").config();
import client from "./client";
import * as express from "express";
import * as logger from "morgan";
import schema from "./schema";
import { ApolloServer } from "apollo-server-express";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
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
