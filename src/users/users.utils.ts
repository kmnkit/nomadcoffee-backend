import { Resolver } from "../types";

export function protectedResolver(ourResolver: Resolver) {
  return function (root, args, context, info) {
    return ourResolver(root, args, context, info);
  };
}
