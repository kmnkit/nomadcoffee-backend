import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { username, email, name, location, password, avatarUrl, githubUsername },
  { client }
) => {
  try {
    const existingUser = await client.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });
    if (existingUser) {
      throw new Error("This username/password is already taken.");
    }
    const uglyPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        username,
        email,
        name,
        location,
        avatarUrl,
        githubUsername,
        password: uglyPassword,
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    return {
      ok: false,
      error: e,
    };
  }
};

const resolver: Resolvers = {
  Mutation: {
    createAccount: resolverFn,
  },
};

export default resolver;
