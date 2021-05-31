import { User } from ".prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, { username }, { loggedInUser, client }) => {
  const ok = await client.user.findUnique({ where: { username } });
  if (!ok) {
    return {
      ok: false,
      error: "That user does not exist.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        connect: {
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
    followUser: protectedResolver(resolverFn),
  },
};

export default resolver;
