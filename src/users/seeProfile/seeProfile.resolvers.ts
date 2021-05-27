import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, { username }, { client }) => {
  const user = await client.user.findUnique({
    where: {
      username,
    },
  });
  console.log(user);
  return user;
};

const resolver: Resolvers = {
  Query: {
    seeProfile: protectedResolver(resolverFn),
  },
};

export default resolver;
