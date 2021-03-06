import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, { username }, { loggedInUser, client }) => {
  const ok = await client.user.findUnique({
    where: { username },
  });
  if (!ok) {
    return {
      ok: false,
      error: "Can't unfollow user",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        disconnect: {
          username,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

const resolver: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(resolverFn),
  },
};

export default resolver;
