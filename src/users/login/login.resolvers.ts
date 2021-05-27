import { User } from ".prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, { username, password }, { client }) => {
  /**
   * Check User already exists.
   */
  const user: User = await client.user.findFirst({ where: { username } });
  if (!user) {
    return {
      ok: false,
      error: "User not found.",
    };
  }

  /**
   * Check Password.
   */
  const passwordOk: boolean = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return {
      ok: false,
      error: "Incorrect Password.",
    };
  }

  /**
   * Json Web Token
   */
  const token: string = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  return {
    ok: true,
    token,
  };
};

const resolver: Resolvers = {
  Mutation: {
    login: resolverFn,
  },
};

export default resolver;
