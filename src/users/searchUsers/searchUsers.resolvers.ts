import { Resolvers } from "../../types";

const resolverFn = (_, { keyword }, { client }) =>
  client.user.findMany({
    where: {
      username: {
        startsWith: keyword.toLowerCase(),
      },
    },
  });

const resolver: Resolvers = {
  Query: {
    searchUsers: resolverFn,
  },
};

export default resolver;
