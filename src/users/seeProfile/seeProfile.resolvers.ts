import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn = (_, { username }, { client }) =>
  client.user.findUnique({
    where: {
      username,
    },
  });

const followers = (_, { username, lastId }, { client }) =>
  client.user
    .findUnique({
      where: {
        username,
      },
    })
    .followers({
      take: 5,
      skip: lastId ? 1 : 0,
    });
const following = (_, { username, lastId }, { client }) =>
  client.user
    .findUnique({
      where: {
        username,
      },
    })
    .following({
      take: 5,
      skip: lastId ? 1 : 0,
    });

const resolver: Resolvers = {
  Query: {
    seeProfile: protectedResolver(resolverFn),
  },
  User: {
    followers,
    following,
  },
};

export default resolver;
