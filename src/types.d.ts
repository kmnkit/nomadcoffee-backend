import { PrismaClient } from "@prisma/client";

type Context = {
  client: PrismaClient;
};

export type errType = {
  ok: Boolean;
  error: string;
};

export type tokenOkType = {
  ok: Boolean;
  token: string;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
